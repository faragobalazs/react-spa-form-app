import sendEmail from "./sendEmail.js";
import htmlTemplate from "./templates/sendInvitationTemplate.js";

const sendInvitationEmail = async ({ email, company }) => {
	//app link
	const template = htmlTemplate({ company });

	const subject = `Invitation from ${process.env.APP_NAME}`;

	await sendEmail({
		to: email,
		subject: subject,
		html: template,
	});
};

export { sendInvitationEmail };
