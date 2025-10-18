import { type Request, type Response, Router } from "express";
import { z } from "zod";
import { createTodo, getTodoList } from "../services/todo.service";

const router = Router();

// Get all todos
router.get("/", (_: Request, res: Response) => {
	const todos = getTodoList();
	return res.json(todos);
});

const createTodoSchema = z.object({
	title: z.string().min(8),
	description: z.string().optional(),
});

// Create a new todo
router.post("/", (req: Request, res: Response) => {
	const input = createTodoSchema.safeParse(req.body);
	if (!input.success) {
		return res.status(400).json({ error: input.error.issues });
	}
	const todo = createTodo(input.data);
	return res.json(todo);
});

export default router;
