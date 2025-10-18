// --------------------------------------------------------------------
import type { Todo, TodoRepository } from "../domain/todo.entity";

export class SimpleTodoRepository implements TodoRepository {
	private db: Todo[] = [];

	findAll(): Todo[] {
		return this.db;
	}

	create(todo: Todo): Todo {
		this.db.push(todo);
		return todo;
	}

	findById(id: string): Todo | null {
		return this.db.find((todo) => todo.id === id) ?? null;
	}

	update(todo: Todo): Todo {
		this.db = this.db.map((t) => (t.id === todo.id ? todo : t));
		return todo;
	}

	delete(id: string): void {
		this.db = this.db.filter((todo) => todo.id !== id);
	}
}
