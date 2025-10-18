import { type Todo, todoRepository } from "../repository/todo.repository";

export function getTodoList(): Todo[] {
	return todoRepository.findAll();
}

export interface CreateTodoInput {
	title: string;
	description?: string;
}

export function createTodo(todo: CreateTodoInput): Todo {
	return todoRepository.create({
		...todo,
		id: crypto.randomUUID(),
		status: "pending",
	});
}

export function getTodoById(id: string): Todo | null {
	return todoRepository.findById(id);
}

export function updateTodo(id: string, todo: Todo): Todo {
	return todoRepository.update(id, todo);
}

export function deleteTodo(id: string): void {
	todoRepository.delete(id);
}
