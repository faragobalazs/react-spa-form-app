const nodemailer = require("nodemailer");

// Email configuration
const emailConfig = {
  host: "jordanapps.tech",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "noreply@jordanapps.tech",
    pass: "Q(+ttIt+pgC2",
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
