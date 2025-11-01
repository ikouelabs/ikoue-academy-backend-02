import { FakeEmailSender } from "./outbound/email.adapter";

export const emailSender = new FakeEmailSender();
//const emailSender = new ResendEmailSender();
