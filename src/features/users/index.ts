import { emailSender } from "../messaging";
import { UserService } from "./domain/users.service";
import { createUserController } from "./inbound/users.rest";
import { DrizzleUserRepository } from "./outbound/users.drizzle.ts";

const repository = new DrizzleUserRepository();

const service = new UserService(repository, emailSender);
const router = createUserController(service);

export default router;
