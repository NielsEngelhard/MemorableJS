"use server";

import { db } from "@/drizzle/db";
import { DbGame, DbGamePlayer, DbGameWithRoundsAndPlayers, GameMode, GameTable } from "@/drizzle/schema";
import { DbGameRound, GameRoundTable } from "@/drizzle/schema/game-round";
import { getCurrentUser } from "@/features/auth/current-user";
import { ValidatedLetter, ValidatedWord } from "@/features/word/word-models";
import { eq } from "drizzle-orm";
import { DetailedValidationResult, WordValidator } from "@/features/word/word-validator";
import { ScoreCalculator } from "@/features/score/score-calculator";
import { CalculateScoreResult } from "@/features/score/score-models";

export interface GuessWordCommand {
    gameId: string;
    word: string;
}

export interface GuessWordResponse {
    guess: ValidatedWord;
    letterStates: ValidatedLetter[];
    scoreResult: CalculateScoreResult;
    theWord?: string; // The word is send along when the current round is over
}


export default async function GuessWord(command: GuessWordCommand): Promise<GuessWordResponse> {    
    const game = await getGame(command.gameId);
    await validateUserAuth(game);

    let currentPlayer = getCurrentPlayer(game);

    let currentRound = game.rounds.find(g => g.roundNumber == game.currentRoundIndex);
    if (!currentRound) throw Error(`GUESS WORD: INVALID STATE could not find round`);    
    
    const validationResult = WordValidator.validateAndFilter(command.word, currentRound.word.word, currentRound.guessedLetters);

    // TODO: move this line to UPDATE CURRENT GAME STATE
    currentRound.guesses.push({
        guessIndex: currentRound.currentGuessIndex,
        letters: validationResult.validatedWord
    });

    const scoreResult = ScoreCalculator.calculate({
        currentGuessIndex: currentRound.currentGuessIndex,
        newLetters: validationResult.newLetters,
        previouslyGuessedLetters: currentRound.guessedLetters,
        wordGuessed: validationResult.allCorrect
    });

    addScoreToPlayer(scoreResult, currentPlayer);

    const currentGuess = await updateCurrentGameState(game, currentRound, validationResult, scoreResult);

    return currentGuess;
}

function addScoreToPlayer(scoreResult: CalculateScoreResult, player: DbGamePlayer) {
    player.score += scoreResult.totalScore;
}

function getCurrentPlayer(game: DbGameWithRoundsAndPlayers): DbGamePlayer {
    return game.players[0]; // Works for solo game because then there is only 1 player - but needs adjustments for multiplayer games TODO FUTURE
}

async function updateCurrentGameState(game: DbGame, currentRound: DbGameRound, validationResult: DetailedValidationResult, scoreResult: CalculateScoreResult): Promise<GuessWordResponse> {
    const roundMaxGuessesReached = currentRound.currentGuessIndex >= game.maxAttemptsPerRound;
    const endCurrentRound = roundMaxGuessesReached || validationResult.allCorrect;
    const endGame = endCurrentRound && (game.currentRoundIndex >= game.totalRounds);

    const currentGuess: ValidatedWord = {
        guessIndex: currentRound.currentGuessIndex,
        letters: validationResult.newLetters
    }

    if (endGame) {
        await triggerEndGame(game);
    } else if (endCurrentRound) {
        await triggerNextRound(game);
    } else {
        await triggerNextGuess(currentRound, currentGuess);
    }

    return {
        guess: currentGuess,
        letterStates: currentRound.guessedLetters,
        theWord: endCurrentRound ? currentRound.word.word : undefined,
        scoreResult: scoreResult
    };    
}

async function triggerNextGuess(currentRound: DbGameRound, currentGuess: ValidatedWord) {
    await db.update(GameRoundTable)
        .set({
            currentGuessIndex: currentRound.currentGuessIndex + 1,
            guesses: currentRound.guesses,
            guessedLetters: currentRound.guessedLetters
        })
        .where(eq(GameRoundTable.id, currentRound.id));          
}

async function triggerNextRound(game: DbGame) {
    await db.update(GameTable)
        .set({
            currentRoundIndex: game.currentRoundIndex + 1
        })
        .where(eq(GameTable.id, game.id));      
}

async function triggerEndGame(game: DbGame) {

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