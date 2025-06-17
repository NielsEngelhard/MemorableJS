CREATE TABLE "user_sessions" (
	"sessionId" text PRIMARY KEY NOT NULL,
	"userId" uuid,
	"role" "user_role" NOT NULL,
	"expireDateTime" timestamp with time zone NOT NULL,
	CONSTRAINT "user_sessions_sessionId_unique" UNIQUE("sessionId")
);
--> statement-breakpoint
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;