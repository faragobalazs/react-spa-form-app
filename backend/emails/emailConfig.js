const nodemailer = require("nodemailer");

// Email configuration from environment variables
const emailConfig = {
  host: process.env.EMAIL_HOST || "jordanapps.tech",
  port: parseInt(process.env.EMAIL_PORT) || 465,
  secure: process.env.MAIL_SECURE === "true" || true, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER || "noreply@jordanapps.tech",
    pass: process.env.MAIL_PASSWORD || "",
  },
};

// Create transporter
const transporter = nodemailer.createTransport(emailConfig);

// Verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log("Email server error:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

module.exports = transporter;
