import { type Request, type Response, Router } from "express";
import { z } from "zod";
import type { UserService } from "../domain/users.service";

const createUserSchema = z.object({
	email: z.email(),
	password: z.string().min(8),
});

const loginSchema = z.object({
	email: z.email(),
	password: z.string().min(8),
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

	router.post("/login", (req: Request, res: Response) => {
		const input = loginSchema.safeParse(req.body);
		if (!input.success) {
			return res.status(400).json({ error: input.error.issues });
		}
		return res.json(service.loginUser(input.data.email, input.data.password));
	});
	return router;
}
