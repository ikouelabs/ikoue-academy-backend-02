export interface User {
	id: string;
	email: string;
	password: string;
	role: string | null;
	createdAt: Date;
}

export interface LoginOutput {
	token: string;
}

export interface UserRepository {
	create(user: User): Promise<User>;
	findByEmail(email: string): Promise<User | null>;
	delete(id: string): Promise<void>;
}
