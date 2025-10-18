import { type Request, type Response, Router } from "express";
import { z } from "zod";
import type { TodoService } from "../domain/todo.service";

const router = Router();

const createTodoSchema = z.object({
	title: z.string().min(8),
	description: z.string().optional(),
});

const updateTodoSchema = z.object({
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

	// Get a todo by id
	router.get("/:id", (req: Request, res: Response) => {
		const { id } = req.params;
		const todo = service.findById(id as string);
		if (!todo) {
			return res.status(404).json({ error: "Todo not found" });
		}
		return res.json(todo);
	});

	// Update a todo
	router.put("/:id", (req: Request, res: Response) => {
		const { id } = req.params;
		const input = updateTodoSchema.safeParse(req.body);
		if (!input.success) {
			return res.status(400).json({ error: input.error.issues });
		}
		const todo = service.updateTodo(id as string, input.data);
		return res.json(todo);
	});

	// Delete a todo
	router.delete("/:id", (req: Request, res: Response) => {
		const { id } = req.params;
		service.deleteTodo(id as string);
		return res.status(204).send();
	});

	return router;
}
