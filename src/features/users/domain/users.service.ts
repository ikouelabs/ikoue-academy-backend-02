import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createJwtToken } from "../../../lib/auth";
import type { LoginOutput, User, UserRepository } from "./users.entity";

interface CreateUserInput {
	email: string;
	password: string;
}

export class UserService {
	private repo: UserRepository;

	constructor(repo: UserRepository) {
		this.repo = repo;
	}

	async createUser(user: CreateUserInput): Promise<User> {
		const existingUser = this.repo.findByEmail(user.email);
		if (existingUser != null) {
			throw new Error("ERR_EMAIL_ALREADY_TAKEN");
		}
		// TODO: vérifier que l'email n'est pas déjà pris
		const hashedPassword = await bcrypt.hash(user.password, 10);
		const entity: User = {
			id: crypto.randomUUID(), // NE JAMAIS UTILISER UN ID AUTO-INCREMENT
			email: user.email,
			password: hashedPassword, // [hashé] BCRYPT
		};
		return this.repo.create(entity);
	}

	verifyToken(token: string): User | null {
		const jwtSecret = process.env.JWT_SECRET!;
		const decoded = jwt.verify(token, jwtSecret);
		if (decoded == null) {
			return null;
		}
		return decoded as User;
	}

	async deleteUser(id: string): Promise<void> {
		return this.repo.delete(id);
	}

	async loginUser(
		email: string,
		password: string,
	): Promise<LoginOutput | null> {
		// 1 - Est-ce que l'utilisateur existe ?
		const user = this.repo.findByEmail(email);
		if (!user) {
			return null;
		}

		const match = await bcrypt.compare(password, user.password);
		if (match) {
			const token = createJwtToken(user.id, user.email, "user");
			return {
				token, // jwt
			};
		} else {
			return null;
		}
	}
}
