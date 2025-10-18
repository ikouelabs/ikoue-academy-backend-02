export interface User {
	id: string;
	email: string;
	password: string;
}

export interface UserRepository {
	create(user: User): User;
	findByEmail(email: string): User | null;
}
