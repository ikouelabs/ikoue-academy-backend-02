import type { Todo, TodoRepository } from "./todo.entity";

export interface CreateTodoInput {
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

	updateTodo(id: string, todo: Todo): Todo {
		return this.repo.update(id, todo);
	}

	deleteTodo(id: string): void {
		this.repo.delete(id);
	}
}
