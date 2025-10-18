import type { Email, EmailSender } from "../domain/email.model";

export class FakeEmailSender implements EmailSender {
	sendEmail(email: Email): void {
		console.log(
			`Sending email to ${email.to} with subject ${email.subject} and html ${email.html}`,
		);
	}
}
