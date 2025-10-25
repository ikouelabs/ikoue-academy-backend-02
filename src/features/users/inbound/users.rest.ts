import { type Request, type Response, Router } from "express";
import { z } from "zod";
import { verifyJwtToken } from "../../../lib/auth";
import type { UserService } from "../domain/users.service";

const createUserSchema = z.object({
	email: z.email(),
	password: z.string().min(8),
});

const loginSchema = z.object({
	email: z.email(),
	password: z.string(),
});

export function createUserController(service: UserService): Router {
	const router = Router();

	router.post("/", async (req: Request, res: Response) => {
		const input = createUserSchema.safeParse(req.body);
		if (!input.success) {
			return res.status(400).json({ error: input.error.issues });
		}
		try {
			const result = await service.createUser(input.data); // Promise<User>
			return res.status(201).json(result);
		} catch (error) {
			if (
				error instanceof Error &&
				error.message === "ERR_EMAIL_ALREADY_TAKEN"
			) {
				return res
					.status(409)
					.json({ error: "Cette adresse email est déjà utilisée" });
			}
			return res.status(500).json({ error: "Internal server error" });
		}
	});

	router.post("/login", async (req: Request, res: Response) => {
		const input = loginSchema.safeParse(req.body);
		if (!input.success) {
			return res.status(400).json({ error: input.error.issues });
		}
		const result = await service.loginUser(
			input.data.email,
			input.data.password,
		);
		if (result == null) {
			return res.status(401).json({ error: "Identifiants invalides" });
		}
		return res.json(result);
	});

	/**
	 * Cette méthode est authentifiée.
	 * Seuls les utilisateurs avec le role admin peuvent supprimer un utilisateur.
	 */
	router.delete("/:id", async (req: Request, res: Response) => {
		// req.body
		const authz = req.headers.authorization;
		if (authz == null) {
			return res.status(401).json({
				error: "L'accès à cette ressource nécessite une authentification",
			});
		}
		// Bearer <token>
		const user = verifyJwtToken(authz, "admin");
		if (user == null) {
			return res.status(401).json({
				error: "L'accès à cette ressource nécessite une authentification",
			});
		}
		if (user.role !== "admin") {
			return res.status(403).json({
				error:
					"Vous n'avez pas les permissions nécessaires pour effectuer cette action",
			});
		}

		// On a bien vérifié que l'utilisateur connecté est admin
		await service.deleteUser(req.params.id!);
		return res.status(204).send();
	});
	return router;
}
