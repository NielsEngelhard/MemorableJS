"use server";

import { db } from "@/drizzle/db";
import { DbGame, DbGamePlayer, DbGameWithRounds, GameMode, GameTable } from "@/drizzle/schema";
import { DbGameRound, GameRoundTable } from "@/drizzle/schema/game-round";
import { getCurrentUser } from "@/features/auth/current-user";
import { ValidatedLetter, ValidatedWord } from "@/features/word/word-models";
import validateWordGuess, { WordValidationResult } from "@/features/word/deprecated-word-validator";
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
    theWord?: string; // The word is send along when the current round is over
}


export default async function GuessWord(command: GuessWordCommand): Promise<GuessWordResponse> {    
    const game = await getGame(command.gameId);
    await validateUserAuth(game);

    let currentRound = game.rounds.find(g => g.roundNumber == game.currentRoundIndex);
    if (!currentRound) throw Error(`GUESS WORD: INVALID STATE could not find round`);    
    
    const validationResult = WordValidator.validateAndFilter(command.word, currentRound.word.word, currentRound.guessedLetters);

    const score = ScoreCalculator.calculate({
        currentGuessIndex: currentRound.currentGuessIndex,
        newLetters: validationResult.newLetters,
        previouslyGuessedLetters: currentRound.guessedLetters,
        wordGuessed: validationResult.allCorrect
    });



    // TODO: ADD MORE ASSIrGNERS ETC? CALCULATION IS DONE BUT THE ASSIGNMENT AND SAFE ETC IS NOT SAFED YET>
    // TODO: Assign score(s) based on current guess
    // TODO: Update the curent game

    // const validationResult = validateAndAddWord(command.word, currentRound);

    const currentGuess = await updateCurrentGameState(game, currentRound, validationResult);

    return currentGuess;
}

function addScoreToPlayer(player: DbGamePlayer, score: CalculateScoreResult) {
    
}

async function updateCurrentGameState(game: DbGame, currentRound: DbGameRound, validationResult: DetailedValidationResult): Promise<GuessWordResponse> {
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
        theWord: endCurrentRound ? currentRound.word.word : undefined
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

function validateAndAddWord(guess: string, currentRound: DbGameRound): WordValidationResult {
    const validationResult = validateWordGuess(guess, currentRound.word, currentRound.guessedLetters);
    if (validationResult == null) throw Error("Invalid guess");
    
    const validatedWord: ValidatedWord = {
        guessIndex: currentRound.currentGuessIndex,
        letters: validationResult.validatedLetters,
    };
    
    currentRound.guesses.push(validatedWord);
    
    return validationResult;
}

async function getGame(gameId: string): Promise<DbGameWithRounds> {
    const game = await db.query.GameTable.findFirst({
        where: (game, { eq }) => eq(game.id, gameId),
        with: {
            rounds: true, // OPTIMIZE: maybe only retrieve the relevant rounds
            players: true // OPTIMIZE: maybe only retrieve the relevant players
        }
    });

    if (!game) throw Error(`Could not find game with ID ${gameId}`);

    return game as unknown as DbGameWithRounds;
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