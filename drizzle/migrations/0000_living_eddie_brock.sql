CREATE TYPE "public"."user_role" AS ENUM('admin', 'user', 'guest');--> statement-breakpoint
CREATE TYPE "public"."game_visibility" AS ENUM('private', 'public', 'friends-only');--> statement-breakpoint
CREATE TYPE "public"."game_mode" AS ENUM('solo', 'mp', 'wod');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"hashedPassword" text NOT NULL,
	"salt" text NOT NULL,
	"role" "user_role" NOT NULL,
	"level" integer NOT NULL,
	"colorHex" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_sessions" (
	"sessionId" text PRIMARY KEY NOT NULL,
	"userId" uuid,
	"role" "user_role" NOT NULL,
	"expireDateTime" timestamp with time zone NOT NULL,
	CONSTRAINT "user_sessions_sessionId_unique" UNIQUE("sessionId")
);
--> statement-breakpoint
CREATE TABLE "letter_league_game" (
	"id" text PRIMARY KEY NOT NULL,
	"userHostId" uuid NOT NULL,
	"currentRound" integer NOT NULL,
	"totalRounds" integer NOT NULL,
	"timePerTurn" integer,
	"maxAttemptsPerRound" integer NOT NULL,
	"words" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"visibility" "game_visibility" NOT NULL,
	"gameMode" "game_mode" NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "letter_league_game" ADD CONSTRAINT "letter_league_game_userHostId_users_id_fk" FOREIGN KEY ("userHostId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;