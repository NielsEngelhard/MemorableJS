ALTER TABLE "letter_league_game" ALTER COLUMN "currentRound" SET DEFAULT 1;--> statement-breakpoint
ALTER TABLE "letter_league_game" ADD COLUMN "wordLength" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "letter_league_game" ADD COLUMN "currentGuess" integer DEFAULT 1 NOT NULL;