import { eq } from "drizzle-orm";
import db from "@/db";
import { usersTable } from "@/db/schemas/users";
import type { User, UserRepository } from "../domain/users.entity";

export class DrizzleUserRepository implements UserRepository {
	async create(user: User): Promise<User> {
		const result = await db.insert(usersTable).values(user).returning();
		return result[0]!;
	}

	async findByEmail(email: string): Promise<User | null> {
		const result = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.email, email));
		if (result.length === 0) {
			return null;
		}
		return result[0]!;
	}

	async delete(id: string): Promise<void> {
		await db.delete(usersTable).where(eq(usersTable.id, id));
	}
}
