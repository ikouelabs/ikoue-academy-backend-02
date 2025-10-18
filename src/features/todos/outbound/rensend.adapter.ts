import type { Email, EmailSender } from "../domain/email.model";

export class ResendEmailSender implements EmailSender {
	sendEmail(email: Email): void {
		throw new Error("TODO");
	}
}
