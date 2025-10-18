import type { EmailSender } from "./email.model";
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
	private emailSender: EmailSender;

	constructor(repo: TodoRepository, emailSender: EmailSender) {
		this.repo = repo;
		this.emailSender = emailSender;
	}

	getTodoList(): Todo[] {
		return this.repo.findAll();
	}

	createTodo(todo: CreateTodoInput): Todo {
		// Règle de gestion
		const result = this.repo.create({
			...todo,
			id: crypto.randomUUID(),
			status: "pending",
		});
		// Envoyer un email de confirmation
		this.emailSender.sendEmail({
			from: "todo@example.com",
			to: "user@example.com",
			subject: "Todo created",
			html: `<p>Your todo has been created: ${result.title}</p>`,
		});
		return result;
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
