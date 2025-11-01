import type { Email, EmailSender } from "../domain/email.model";

export class FakeEmailSender implements EmailSender {
	async sendEmail(email: Email): Promise<void> {
		console.log(
			`Sending email to ${email.to} with subject ${email.subject} and message ${email.message}`,
		);
	}
}
