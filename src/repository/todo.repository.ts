export interface Todo {
	id: string;
	title: string;
	description?: string;
	status: string;
}

interface TodoRepository {
	findAll(): Todo[];
	create(todo: Todo): Todo;
	findById(id: string): Todo | null;
	update(id: string, todo: Todo): Todo;
	delete(id: string): void;
}

// --------------------------------------------------------------------

class SimpleTodoRepository implements TodoRepository {
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

	update(id: string, todo: Todo): Todo {
		this.db = this.db.map((t) => (t.id === id ? todo : t));
		return todo;
	}

	delete(id: string): void {
		this.db = this.db.filter((todo) => todo.id !== id);
	}
}

/*
class PrismaTodoRepository implements TodoRepository {
	//
}

class DrizzleTodoRepository implements TodoRepository {
	//
}
*/

// --------------------------------------------------------------------

export const todoRepository: TodoRepository = new SimpleTodoRepository();
