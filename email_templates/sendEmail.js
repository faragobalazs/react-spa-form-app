import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, html }) => {
	// Custom Postmark transport for nodemailer
	// Best practice would be to save the API key to an env variable

	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: Number(process.env.EMAIL_PORT),
		secure: process.env.EMAIL_SECURE === "true" ? true : false, // true for 465, false for other ports
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	// send mail with defined transport object
	return transporter.sendMail({
		from: process.env.MAIL_SENT_FROM,
		to,
		subject,
		html,
	});
};

export default sendEmail;
