import type { Todo, TodoRepository } from "../domain/todo.entity";
// --------------------------------------------------------------------
/// Faire appel à drizzle ou prisma, etc

export class DBTodoRepository implements TodoRepository {
	findAll(): Todo[] {
		throw new Error("TODO");
	}

	create(todo: Todo): Todo {
		throw new Error("TODO");
	}

	findById(id: string): Todo | null {
		throw new Error("TODO");
	}

	update(id: string, todo: Todo): Todo {
		throw new Error("TODO");
	}

	delete(id: string): void {
		throw new Error("TODO");
	}
}
