import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

// O --- > R (M)
export const usersTable = pgTable("users", {
	id: text().primaryKey(),
	email: text().notNull().unique(),
	password: text().notNull(),
	role: text(), // string | null
	status: text().notNull().default("active"), // "active" | "inactive"
	createdAt: timestamp("created_at").notNull(), // camelCase ->  snake_case
});
