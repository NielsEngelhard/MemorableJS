CREATE TYPE "public"."user_role" AS ENUM('admin', 'user', 'guest');--> statement-breakpoint
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
