import type { User, UserRepository } from "../domain/users.entity";

export class SimpleUserRepository implements UserRepository {
	private db: User[] = [];

	async create(user: User): Promise<User> {
		this.db.push(user);
		return user;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = this.db.find((user) => user.email === email);
		if (user == null) {
			return null;
		}
		return user;
	}

	async delete(id: string): Promise<void> {
		this.db = this.db.filter((user) => user.id !== id);
	}
}
