export interface Email {
	from: string;
	to: string;
	subject: string;
	html: string;
}

export interface EmailSender {
	sendEmail(email: Email): void;
}
