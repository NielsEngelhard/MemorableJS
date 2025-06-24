"use server"

import { db } from "@/drizzle/db";
import { getCurrentUser } from "../auth/current-user";
import { generateGameId } from "../game/game-id-generator";
import { CreateLetterLeagueGame, LetterLeagueGame, LetterLeagueGuessCommand, LetterLeagueRound } from "./schemas";
import GetRandomWords from "./word/actions";
import { LetterLeagueGameTable } from "@/drizzle/schema";
import { GameVisibility } from "@/drizzle/schema/enum/game-visibility";
import { eq } from "drizzle-orm";
import MapLetterLeagueGameFromDb from "./mappers";
import { LetterLeagueGuessResponse, ValidatedWord } from "@/drizzle/schema/model/letter-league-models";
import validateLetterLeagueWord from "./word/word-validator";
import { LetterState } from "@/drizzle/schema/enum/letter-state";

export async function CreateGame(command: CreateLetterLeagueGame) {
    const words = GetRandomWords(command.wordLength, "nl", command.totalRounds);

    const userId = (await getCurrentUser())?.user.id;
    if (!userId) throw new Error("User seems not logged in");

    const result = await db.insert(LetterLeagueGameTable).values({
        id: generateGameId(),
        maxAttemptsPerRound: command.maxAttemptsPerRound,
        timePerTurn: command.timePerTurn,
        totalRounds: words.length,
        userHostId: userId,
        words: words,
        visibility: command.gameVisibility ?? GameVisibility.Private,
        gameMode: command.gameMode,
        wordLength: command.wordLength,
        currentGuess: 1,
        currentRound: 1,
        rounds: words.map((word, index) => {
            return {
                roundNumber: word.round,
                guessedLetters: [{ letter: word.word[0], position: 1, state: LetterState.Correct }],
                guesses: []
            }                            
        }),
    }).returning({
        gameId: LetterLeagueGameTable.id
    });

    return result[0];
}

export async function GetLetterLeagueGame(gameId: string): Promise<LetterLeagueGame | null> {
    const result = await db
        .select()
        .from(LetterLeagueGameTable)
        .where(eq(LetterLeagueGameTable.id, gameId));

    if (result.length != 1) {
        console.log(`Could not find game with id ${gameId}`);
        return null;
    };
    const game = result[0];
        
    return MapLetterLeagueGameFromDb(game);
}

export async function submitLetterLeagueGuess(command: LetterLeagueGuessCommand): Promise<LetterLeagueGuessResponse> {
    // TODO: check if user is authenticated to do this
    // const session = await auth();
    // if (!session || !session.user) {
    //     throw new Error("User not authenticated");
    // }
    
    const result = await db
        .select()
        .from(LetterLeagueGameTable)
        .where(eq(LetterLeagueGameTable.id, command.gameId));
    if (result.length != 1) throw Error(`Could not find game with id ${command.gameId}`);
    const game = result[0];
    
    // Check if the authenticated user is allowed to play this game
    // if (game.userId !== session.user.id) {
    //     throw new Error("User not authorized to play this game");
    // }
    
    const currentWord = game.words.find(w => w.round == game.currentRound);
    if (!currentWord) throw Error(`There is no word for round ${game.currentRound}`);
    // Validate word
    const validatedLetters = validateLetterLeagueWord(command.word, currentWord.word);
    if (validatedLetters == null) throw Error("Invalid guess");
    
    const validatedWord: ValidatedWord = {
        guess: game.currentGuess,
        letters: validatedLetters,        
    };
    
    let round = game.rounds.find(g => g.roundNumber == game.currentRound);
    if (!round) {
        round = {
            roundNumber: game.currentRound,
            guesses: [],
            guessedLetters: []
        }
        game.rounds.push(round);
    }
    
    // Add the validated word to the guesses for this round
    round.guesses.push(validatedWord);

    // Add new validated letters without duplicating entries with same letter and state
    round.guessedLetters = [
    ...round.guessedLetters,
    ...validatedLetters.filter(newLetter => 
        !round.guessedLetters.some(existingLetter => 
        existingLetter.letter === newLetter.letter && 
        existingLetter.state === newLetter.state
        )
    )
    ];

    await db.update(LetterLeagueGameTable)
        .set({
            rounds: game.rounds,
            currentGuess: game.currentGuess + 1
        })
        .where(eq(LetterLeagueGameTable.id, command.gameId));

    const isCorrectGuess = validatedLetters.every(letter => letter.state === LetterState.Correct);
    const isLastGuessOfRound = game.currentGuess >= game.maxAttemptsPerRound || isCorrectGuess;
    const isLastRound = game.currentRound >= game.totalRounds;

    if (isLastGuessOfRound && isLastRound) { // END THE GAME
        // TODO: write end game flow
    } else if (isLastGuessOfRound) {         // NEXT ROUND
        // Move to the next round
        await db.update(LetterLeagueGameTable)
            .set({
                currentGuess: 1,
                currentRound: game.currentRound + 1
            })
            .where(eq(LetterLeagueGameTable.id, command.gameId));
    }
    
    return {
        guess: validatedWord,
        letterStates: round.guessedLetters,
        triggerNextRound: isCorrectGuess && !isLastRound,
    };
}
