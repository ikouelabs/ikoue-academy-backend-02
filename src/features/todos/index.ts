import { TodoService } from "./domain/todo.service";
import { createTodoController } from "./inbound/todo.rest";
import { FakeEmailSender } from "./outbound/email.adapter";
import { SimpleTodoRepository } from "./outbound/todo.simple.repository";

const repository = new SimpleTodoRepository(); // DBTodoRepository
const emailSender = new FakeEmailSender(); // ResendEmailSender
const service = new TodoService(repository, emailSender);
const router = createTodoController(service);

export default router;
