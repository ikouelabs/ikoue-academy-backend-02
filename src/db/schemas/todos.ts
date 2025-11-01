import { pgTable, text } from "drizzle-orm/pg-core";

export const todosTable = pgTable("todos", {
	id: text().primaryKey(),
	title: text().notNull(),
	description: text(),
	status: text().notNull(),
});
