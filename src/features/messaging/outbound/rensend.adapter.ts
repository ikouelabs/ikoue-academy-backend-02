import { Resend } from "resend";
import type { Email, EmailSender } from "../domain/email.model";

const resend = new Resend(process.env.RESEND_API_KEY);

export class ResendEmailSender implements EmailSender {
	async sendEmail(email: Email): Promise<void> {
		console.log("[resend] sending email to", email.to);
		const { error } = await resend.emails.send({
			from: "CBKApps <noreply@notifications.cbkapps.com>",
			to: [email.to],
			subject: email.subject,
			html: email.message,
		});
		if (error) {
			console.error(error);
			throw new Error("Failed to send email");
		}
		console.log("[resend] email sent successfully");
	}
}
