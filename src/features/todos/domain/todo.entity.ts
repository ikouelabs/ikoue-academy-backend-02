export interface Todo {
	id: string;
	title: string;
	description?: string;
	status: string;
}

export interface TodoRepository {
	findAll(): Todo[];
	create(todo: Todo): Todo;
	findById(id: string): Todo | null;
	update(todo: Todo): Todo;
	delete(id: string): void;
}
