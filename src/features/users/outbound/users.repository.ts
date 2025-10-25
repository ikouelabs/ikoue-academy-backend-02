import type { User, UserRepository } from "../domain/users.entity";

export class SimpleUserRepository implements UserRepository {
	private db: User[] = [];

	create(user: User): User {
		this.db.push(user);
		return user;
	}

	findByEmail(email: string): User | null {
		const user = this.db.find((user) => user.email === email);
		if (user == null) {
			return null;
		}
		return user;
	}
}
