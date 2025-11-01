//import { ResendEmailSender } from "../messaging/outbound/rensend.adapter.ts";
import { FakeEmailSender } from "../messaging/outbound/email.adapter";
import { UserService } from "./domain/users.service";
import { createUserController } from "./inbound/users.rest";
import { DrizzleUserRepository } from "./outbound/users.drizzle.ts";

const repository = new DrizzleUserRepository();
const emailSender = new FakeEmailSender();
//const emailSender = new ResendEmailSender();
const service = new UserService(repository, emailSender);
const router = createUserController(service);

export default router;
