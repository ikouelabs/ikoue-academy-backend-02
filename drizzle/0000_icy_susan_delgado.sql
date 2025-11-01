CREATE TABLE "todos" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"status" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" text,
	"status" text DEFAULT 'active' NOT NULL,
	"createdAt" timestamp NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
