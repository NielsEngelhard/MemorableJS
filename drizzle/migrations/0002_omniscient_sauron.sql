CREATE TABLE "game_player" (
	"userId" uuid NOT NULL,
	"gameId" text NOT NULL,
	"score" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "game_player_userId_gameId_pk" PRIMARY KEY("userId","gameId")
);
--> statement-breakpoint
ALTER TABLE "game_player" ADD CONSTRAINT "game_player_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_player" ADD CONSTRAINT "game_player_gameId_game_id_fk" FOREIGN KEY ("gameId") REFERENCES "public"."game"("id") ON DELETE no action ON UPDATE no action;