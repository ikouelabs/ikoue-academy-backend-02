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

	createUser(user: CreateUserInput): User {
		// Vérifier que l'email n'est pas déjà pris
		// Créer l'utilisateur
		throw new Error("TODO");
	}

	loginUser(email: string, password: string): User {
		// Vérifier que l'email et le mot de passe sont corrects
		// Créer un token JWT
		throw new Error("TODO");
	}
}
