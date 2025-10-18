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

	router.post("/", (req: Request, res: Response) => {
		const input = createUserSchema.safeParse(req.body);
		if (!input.success) {
			return res.status(400).json({ error: input.error.issues });
		}
		return res.json(service.createUser(input.data));
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
