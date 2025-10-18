import { type Request, type Response, Router } from "express";
import { z } from "zod";
import type { TodoService } from "../domain/todo.service";

const router = Router();

const createTodoSchema = z.object({
	title: z.string().min(8),
	description: z.string().optional(),
});

export function createTodoController(service: TodoService): Router {
	// Get all todos
	router.get("/", (_: Request, res: Response) => {
		const todos = service.getTodoList();
		return res.json(todos);
	});

	// Create a new todo
	router.post("/", (req: Request, res: Response) => {
		const input = createTodoSchema.safeParse(req.body);
		if (!input.success) {
			return res.status(400).json({ error: input.error.issues });
		}
		const todo = service.createTodo(input.data);
		return res.json(todo);
	});

	return router;
}
