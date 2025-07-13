"use server";

import { db } from "@/drizzle/db";
import { DbGame, DbGamePlayer, DbGameWithRoundsAndPlayers, GameHistoryTable, GameMode, GamePlayerTable, GameTable } from "@/drizzle/schema";
import { DbGameRound, GameRoundTable } from "@/drizzle/schema/game-round";
import { getCurrentUser } from "@/features/auth/current-user";
import { ValidatedLetter, ValidatedWord } from "@/features/word/word-models";
import { and, eq } from "drizzle-orm";
import { DetailedValidationResult, WordValidator } from "@/features/word/word-validator";
import { ScoreCalculator } from "@/features/score/score-calculator";
import { CalculateScoreResult } from "@/features/score/score-models";
import { mapGameToHistory } from "../../mappers";

export interface GuessWordCommand {
    gameId: string;
    word: string;
}

export interface GuessWordResponse {
    userId: string;
    guessResult: ValidatedWord;
    newLetters: ValidatedLetter[];
    scoreResult: CalculateScoreResult;
    roundTransitionData?: RoundTransitionData;
}

export interface RoundTransitionData {    
    currentWord: string;
    isEndOfGame: boolean;
    gameHistoryId: string;
    nextRoundFirstLetter?: string;    
}

export default async function GuessWord(command: GuessWordCommand): Promise<GuessWordResponse> {    
    const game = await getGame(command.gameId);
    await validateUserAuth(game);

    let currentPlayer = getCurrentPlayer(game);

    let currentRound = game.rounds.find(g => g.roundNumber == game.currentRoundIndex);
    if (!currentRound) throw Error(`GUESS WORD: INVALID STATE could not find round`);    
    
    const validationResult = WordValidator.validateAndFilter(command.word, currentRound.word.word, currentRound.guessedLetters);

    const scoreResult = ScoreCalculator.calculate({
        currentGuessIndex: currentRound.currentGuessIndex,
        newLetters: validationResult.newLetters,
        previouslyGuessedLetters: currentRound.guessedLetters,
        wordGuessed: validationResult.allCorrect
    });

    addScoreToPlayer(scoreResult, currentPlayer);

    const currentGuess = await updateCurrentGameState(game, currentRound, validationResult, scoreResult, currentPlayer);

    return currentGuess;
}

function addScoreToPlayer(scoreResult: CalculateScoreResult, player: DbGamePlayer) {
    player.score += scoreResult.totalScore;
}

function getCurrentPlayer(game: DbGameWithRoundsAndPlayers): DbGamePlayer {
    return game.players[0]; // Works for solo game because then there is only 1 player - but needs adjustments for multiplayer games TODO FUTURE
}

async function updateCurrentGameState(game: DbGameWithRoundsAndPlayers, currentRound: DbGameRound, validationResult: DetailedValidationResult, scoreResult: CalculateScoreResult, currentPlayer: DbGamePlayer): Promise<GuessWordResponse> {
    const roundMaxGuessesReached = currentRound.currentGuessIndex >= game.maxAttemptsPerRound;
    const endCurrentRound = roundMaxGuessesReached || validationResult.allCorrect;
    const endGame = endCurrentRound && (game.currentRoundIndex >= game.totalRounds);

    const currentGuess: ValidatedWord = {
        guessIndex: currentRound.currentGuessIndex,
        letters: validationResult.validatedWord
    }

    let gameHistoryId = "";
    if (endGame) {
        currentPlayer.score += scoreResult.totalScore;
        currentRound.guesses.push(currentGuess);
        gameHistoryId = await triggerEndGame(game);
    } else if (endCurrentRound) {
        await triggerNextRound(currentRound, validationResult, currentPlayer, scoreResult, game);
    } else {
        await triggerNextGuess(currentRound, validationResult, currentPlayer, scoreResult);
    }

    return {
        userId: currentPlayer.userId,
        guessResult: currentGuess,
        newLetters: validationResult.newLetters,
        scoreResult: scoreResult,
        roundTransitionData: endCurrentRound ? {
            isEndOfGame: endGame,
            currentWord: currentRound.word.word,
            nextRoundFirstLetter: endCurrentRound ? "Z" : undefined,
            gameHistoryId: gameHistoryId
        } : undefined
    };    
}

async function triggerNextGuess(currentRound: DbGameRound, validationResult: DetailedValidationResult, currentPlayer: DbGamePlayer, scoreResult: CalculateScoreResult) {
    await db.transaction(async (tx) => {
        await updateGameRoundWithCurrentGuess(currentRound, validationResult);
        await addScoreForPlayer(currentPlayer, scoreResult.totalScore);
    });          
}

async function triggerNextRound(currentRound: DbGameRound, validationResult: DetailedValidationResult, currentPlayer: DbGamePlayer, scoreResult: CalculateScoreResult, game: DbGame) {
    await db.transaction(async (tx) => {        
        await updateGameRoundWithCurrentGuess(currentRound, validationResult);
        await addScoreForPlayer(currentPlayer, scoreResult.totalScore);
        await updateGameForNextRound(game);
    });          
}

async function triggerEndGame(game: DbGameWithRoundsAndPlayers): Promise<string> {
    let gameHistoryId: string = "";
    
    // OPTIMIZATION: Do this via a message broker so that the request can be handled async and the speed of the entire flow will benefit
    await db.transaction(async (tx) => {
        gameHistoryId = await createGameHistory(game);   
        await deleteGame(game.id);
    });  

    return gameHistoryId;
}

async function getGame(gameId: string): Promise<DbGameWithRoundsAndPlayers> {
    const game = await db.query.GameTable.findFirst({
        where: (game, { eq }) => eq(game.id, gameId),
        with: {
            rounds: true, // OPTIMIZE: maybe only retrieve the relevant rounds
            players: true // OPTIMIZE: maybe only retrieve the relevant players
        }
    });

    if (!game) throw Error(`Could not find game with ID ${gameId}`);

    return game as unknown as DbGameWithRoundsAndPlayers;
}

async function validateUserAuth(game: DbGame) {
    const session = await getCurrentUser();
    if (!session || !session.user) throw new Error("User not authenticated");

    switch(game.gameMode) {
        case (GameMode.Solo): {
            if (session.user.id != game.userHostId) throw Error("User is not the owner of this solo game");
            break;
        }
    }
}

async function updateGameRoundWithCurrentGuess(currentRound: DbGameRound, validationResult: DetailedValidationResult) {
    await db.update(GameRoundTable)
        .set({
            currentGuessIndex: currentRound.currentGuessIndex + 1,
            guesses: [...currentRound.guesses, {
                guessIndex: currentRound.currentGuessIndex,
                letters: validationResult.validatedWord
            }],
            guessedLetters: [...currentRound.guessedLetters, ...validationResult.newLetters]
        })
        .where(eq(GameRoundTable.id, currentRound.id));        
}

async function updateGameForNextRound(game: DbGame) {
    await db.update(GameTable)
        .set({
            currentRoundIndex: game.currentRoundIndex + 1
        })
        .where(eq(GameTable.id, game.id));    
}

async function deleteGame(gameId: string) { 
    await db.delete(GameTable)
        .where(eq(GameTable.id, gameId));      
}

async function createGameHistory(game: DbGameWithRoundsAndPlayers): Promise<string> {
    const gameHistory = mapGameToHistory(game);
    const result = await db.insert(GameHistoryTable).values(gameHistory).returning({
        gameHistoryId: GameHistoryTable.id
    });        

    return result[0].gameHistoryId;
}

async function addScoreForPlayer(player: DbGamePlayer, score: number) {
  await db.update(GamePlayerTable)
    .set({
      score: player.score + score,
    })
    .where(
      and(
        eq(GamePlayerTable.userId, player.userId),
        eq(GamePlayerTable.gameId, player.gameId)
      )
    );
}