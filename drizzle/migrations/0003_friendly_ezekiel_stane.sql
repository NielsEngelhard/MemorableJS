CREATE TYPE "public"."multiplayer_mode" AS ENUM('standard');--> statement-breakpoint
CREATE TABLE "multiplayer_lobby" (
	"id" text PRIMARY KEY NOT NULL,
	"userHostId" uuid NOT NULL,
	"multiplayerMode" "multiplayer_mode" NOT NULL,
	"players" jsonb NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "multiplayer_lobby" ADD CONSTRAINT "multiplayer_lobby_userHostId_users_id_fk" FOREIGN KEY ("userHostId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;