import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// O --- > R (M)
export const usersTable = sqliteTable("users", {
	id: text().primaryKey(),
	email: text().notNull().unique(),
	password: text().notNull(),
	role: text(), // string | null
	createdAt: integer({ mode: "timestamp" }).notNull(),
	updatedAt: integer({ mode: "timestamp" }), // update
});

export const todosTable = sqliteTable("todos", {
	id: text().primaryKey(),
	title: text().notNull(),
	description: text(),
	status: text().notNull(),
});
