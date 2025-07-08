CREATE TABLE "game_round" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"gameId" text NOT NULL,
	"roundNumber" integer NOT NULL,
	"currentGuessIndex" integer DEFAULT 1 NOT NULL,
	"word" jsonb NOT NULL,
	"guesses" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"guessed_letters" jsonb DEFAULT '[]'::jsonb NOT NULL,
	CONSTRAINT "game_round_gameId_roundNumber_unique" UNIQUE("gameId","roundNumber")
);
--> statement-breakpoint
ALTER TABLE "game_round" ADD CONSTRAINT "game_round_gameId_game_id_fk" FOREIGN KEY ("gameId") REFERENCES "public"."game"("id") ON DELETE no action ON UPDATE no action;