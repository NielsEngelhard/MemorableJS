"use server"

import { db } from "@/drizzle/db";
import { getCurrentUser } from "../auth/current-user";
import { generateGameId } from "../game/game-id-generator";
import { CreateLetterLeagueGame, LetterLeagueGame, LetterLeagueGuessCommand, LetterLeagueRound } from "./schemas";
import { LetterLeagueGameTable } from "@/drizzle/schema";
import { GameVisibility } from "@/drizzle/schema/enum/game-visibility";
import { eq } from "drizzle-orm";
import MapLetterLeagueGameFromDb from "./mappers";
import { LetterLeagueGuessResponse, ValidatedWord } from "@/drizzle/schema/model/letter-league-models";
import validateLetterLeagueWord from "./word/word-validator";
import LetterLeagueRoundFactory from "./letter-league-round-factory";
import { LetterLeagueWordFactory } from "./word/word-factory";
import { IWordService, TxtFileWordService } from "./word/word-service";

// TODO actions splitsen naar action per file? miss command and query mappie erbij?

export async function CreateGame(command: CreateLetterLeagueGame) {
    const words = await getWords(command.totalRounds, command.wordLength, "nl");

    const userId = (await getCurrentUser())?.user.id;
    if (!userId) throw new Error("User seems not logged in");

    const result = await db.insert(LetterLeagueGameTable).values({
        id: generateGameId(),
        maxAttemptsPerRound: command.maxAttemptsPerRound,
        timePerTurn: command.timePerTurn,
        totalRounds: words.length,
        userHostId: userId,
        visibility: command.gameVisibility ?? GameVisibility.Private,
        gameMode: command.gameMode,
        wordLength: command.wordLength,
        currentGuess: 1,
        currentRound: 1,
        rounds: LetterLeagueRoundFactory.createRounds(LetterLeagueWordFactory.createFromArray(words)),
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

    let round = game.rounds.find(g => g.roundNumber == game.currentRound);
    if (!round) throw Error(`LETTERLEAGUE: INVALID STATE could not find round`);    
    
    // Validate word
    const validationResult = validateLetterLeagueWord(command.word, round.word, round.guessedLetters);
    if (validationResult == null) throw Error("Invalid guess");
    
    const validatedWord: ValidatedWord = {
        guess: game.currentGuess,
        letters: validationResult.validatedLetters,        
    };
    
    // Add the validated word to the guesses for this round
    round.guesses.push(validatedWord);

    await db.update(LetterLeagueGameTable)
        .set({
            rounds: game.rounds,
            currentGuess: game.currentGuess + 1
        })
        .where(eq(LetterLeagueGameTable.id, command.gameId));

    const maxGuessesReached = game.currentGuess >= game.maxAttemptsPerRound;
    const isLastGuessOfRound = maxGuessesReached || validationResult.allCorrect;
    const isLastRound = game.currentRound >= game.totalRounds;

    if (validationResult.allCorrect) {
        // GOTO NEXT ROUND IF NOT LAST
        await db.update(LetterLeagueGameTable)
            .set({
                currentGuess: 1,
                currentRound: game.currentRound + 1
            })
            .where(eq(LetterLeagueGameTable.id, command.gameId));        
    } else if (isLastGuessOfRound && isLastRound) { // END THE GAME
        // TODO: write end game flow
    } else if (isLastGuessOfRound) {         // NEXT ROUND
        // Move to the next round AND SHOW WORD
        await db.update(LetterLeagueGameTable)
            .set({
                currentGuess: 1,
                currentRound: game.currentRound + 1
            })
            .where(eq(LetterLeagueGameTable.id, command.gameId));
    }
    
    const triggerNextRound = (validationResult.allCorrect || isLastGuessOfRound);
    return {
        guess: validatedWord,
        letterStates: round.guessedLetters,
        theWord: triggerNextRound ? round.word.word : undefined
    };
}

async function getWords(amount: number, wordLength: number, language: string): Promise<string[]> {
    const wordService: IWordService = new TxtFileWordService();
    return await wordService.getWords(amount, wordLength, language);
}