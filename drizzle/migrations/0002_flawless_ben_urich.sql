ALTER TABLE "game_round" DROP CONSTRAINT "game_round_gameId_game_id_fk";
--> statement-breakpoint
ALTER TABLE "game_player" DROP CONSTRAINT "game_player_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "game_player" DROP CONSTRAINT "game_player_gameId_game_id_fk";
--> statement-breakpoint
ALTER TABLE "game_round" ADD CONSTRAINT "game_round_gameId_game_id_fk" FOREIGN KEY ("gameId") REFERENCES "public"."game"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_player" ADD CONSTRAINT "game_player_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_player" ADD CONSTRAINT "game_player_gameId_game_id_fk" FOREIGN KEY ("gameId") REFERENCES "public"."game"("id") ON DELETE cascade ON UPDATE no action;