import sendEmail from "./sendEmail.js";

sendEmail({
	to: "jordangergoviktor@gmail.com",
	subject: "Valami test",
	html: "<p>Siker</p>",
});

console.log("testEmail.js");
