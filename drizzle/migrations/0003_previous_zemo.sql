CREATE TABLE "game_history" (
	"id" text PRIMARY KEY NOT NULL,
	"userHostId" uuid NOT NULL,
	"gameMode" "game_mode" NOT NULL,
	"totalScore" integer NOT NULL,
	"guesses" jsonb NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "game_player" ADD COLUMN "username" text NOT NULL;--> statement-breakpoint
ALTER TABLE "game_history" ADD CONSTRAINT "game_history_userHostId_users_id_fk" FOREIGN KEY ("userHostId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;