const transporter = require("./emailConfig");
const {
  createWelcomeEmailTemplate,
  createRecordCreatedEmailTemplate,
} = require("./emailTemplates");

class EmailService {
  // Send welcome email
  static async sendWelcomeEmail(userName, userEmail) {
    try {
      const htmlContent = createWelcomeEmailTemplate(userName, userEmail);

      const mailOptions = {
        from: "noreply@jordanapps.tech",
        to: userEmail,
        subject: "Welcome to Jordan Apps!",
        html: htmlContent,
      };

      const result = await transporter.sendMail(mailOptions);
      console.log("Welcome email sent successfully:", result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error("Error sending welcome email:", error);
      throw error;
    }
  }

  // Send record created notification
  static async sendRecordCreatedEmail(
    recordData,
    adminEmail = "admin@jordanapps.tech"
  ) {
    try {
      const htmlContent = createRecordCreatedEmailTemplate(recordData);

      const mailOptions = {
        from: "noreply@jordanapps.tech",
        to: adminEmail,
        subject: "New Record Created - Jordan Apps",
        html: htmlContent,
      };

      const result = await transporter.sendMail(mailOptions);
      console.log("Record created email sent successfully:", result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error("Error sending record created email:", error);
      throw error;
    }
  }

  // Send custom email
  static async sendCustomEmail(to, subject, htmlContent) {
    try {
      const mailOptions = {
        from: "noreply@jordanapps.tech",
        to: to,
        subject: subject,
        html: htmlContent,
      };

      const result = await transporter.sendMail(mailOptions);
      console.log("Custom email sent successfully:", result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error("Error sending custom email:", error);
      throw error;
    }
  }

  // Test email connection
  static async testConnection() {
    try {
      await transporter.verify();
      return { success: true, message: "Email server connection successful" };
    } catch (error) {
      console.error("Email server connection failed:", error);
      throw error;
    }
  }
}

module.exports = EmailService;
