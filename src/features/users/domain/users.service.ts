import bcrypt from "bcrypt";
import type { User, UserRepository } from "./users.entity";

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

	loginUser(email: string, password: string): User {
		// Vérifier que l'email et le mot de passe sont corrects
		// Créer un token JWT
		throw new Error("TODO");
	}
}
