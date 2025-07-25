CREATE TYPE "public"."supported_language" AS ENUM('nl', 'en');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "language" "supported_language" DEFAULT 'nl' NOT NULL;