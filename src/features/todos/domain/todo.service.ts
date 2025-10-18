import type { Todo, TodoRepository } from "./todo.entity";

export interface CreateTodoInput {
	title: string;
	description?: string;
}

export interface UpdateTodoInput {
	title: string;
	description?: string;
}

export class TodoService {
	private repo: TodoRepository;

	constructor(repo: TodoRepository) {
		this.repo = repo;
	}

	getTodoList(): Todo[] {
		return this.repo.findAll();
	}

	createTodo(todo: CreateTodoInput): Todo {
		return this.repo.create({
			...todo,
			id: crypto.randomUUID(),
			status: "pending",
		});
	}

	findById(id: string): Todo | null {
		return this.repo.findById(id);
	}

	updateTodo(id: string, todo: UpdateTodoInput): Todo {
		const existingTodo = this.repo.findById(id) as Todo;
		if (!existingTodo) {
			throw new Error("Todo not found");
		}
		return this.repo.update({
			...existingTodo,
			...todo,
		});
	}

	deleteTodo(id: string): void {
		this.repo.delete(id);
	}
}
