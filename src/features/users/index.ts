import { UserService } from "./domain/users.service";
import { createUserController } from "./inbound/users.rest";
import { SimpleUserRepository } from "./outbound/users.repository.ts";

const repository = new SimpleUserRepository();
const service = new UserService(repository);
const router = createUserController(service);

export default router;
