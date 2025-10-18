import { TodoService } from "./domain/todo.service";
import { createTodoController } from "./inbound/todo.rest";
import { SimpleTodoRepository } from "./outbound/todo.simple.repository";

const repository = new SimpleTodoRepository();
const service = new TodoService(repository);
const router = createTodoController(service);

export default router;
