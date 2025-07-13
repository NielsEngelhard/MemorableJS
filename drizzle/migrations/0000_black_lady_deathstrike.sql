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
CREATE TABLE "game" (
	"id" text PRIMARY KEY NOT NULL,
	"userHostId" uuid NOT NULL,
	"totalRounds" integer NOT NULL,
	"timePerTurn" integer,
	"maxAttemptsPerRound" integer NOT NULL,
	"visibility" "game_visibility" NOT NULL,
	"gameMode" "game_mode" NOT NULL,
	"wordLength" integer NOT NULL,
	"currentRoundIndex" integer DEFAULT 1 NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid,
	"showOnScreenKeyboard" boolean DEFAULT true NOT NULL,
	"playSoundEffects" boolean DEFAULT true NOT NULL,
	"preFillWord" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "en_words" (
	"word" text PRIMARY KEY NOT NULL,
	"length" integer NOT NULL,
	CONSTRAINT "en_words_word_unique" UNIQUE("word")
);
--> statement-breakpoint
CREATE TABLE "nl_words" (
	"word" text PRIMARY KEY NOT NULL,
	"length" integer NOT NULL,
	CONSTRAINT "nl_words_word_unique" UNIQUE("word")
);
--> statement-breakpoint
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
CREATE TABLE "game_player" (
	"userId" uuid NOT NULL,
	"gameId" text NOT NULL,
	"username" text NOT NULL,
	"score" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "game_player_userId_gameId_pk" PRIMARY KEY("userId","gameId")
);
--> statement-breakpoint
CREATE TABLE "game_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userHostId" uuid NOT NULL,
	"gameMode" "game_mode" NOT NULL,
	"totalScore" integer NOT NULL,
	"guesses" jsonb NOT NULL,
	"players" jsonb NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game" ADD CONSTRAINT "game_userHostId_users_id_fk" FOREIGN KEY ("userHostId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_round" ADD CONSTRAINT "game_round_gameId_game_id_fk" FOREIGN KEY ("gameId") REFERENCES "public"."game"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_player" ADD CONSTRAINT "game_player_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_player" ADD CONSTRAINT "game_player_gameId_game_id_fk" FOREIGN KEY ("gameId") REFERENCES "public"."game"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_history" ADD CONSTRAINT "game_history_userHostId_users_id_fk" FOREIGN KEY ("userHostId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;