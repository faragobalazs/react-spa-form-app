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
        from: process.env.MAIL_USER || "noreply@jordanapps.tech",
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
    adminEmail = process.env.ADMIN_EMAIL || "admin@jordanapps.tech"
  ) {
    try {
      const htmlContent = createRecordCreatedEmailTemplate(recordData);

      const mailOptions = {
        from: process.env.MAIL_USER || "noreply@jordanapps.tech",
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
        from: process.env.MAIL_USER || "noreply@jordanapps.tech",
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

  // Send bulk emails
  static async sendBulkEmails(recipients, subject, htmlContent) {
    try {
      const results = [];
      const errors = [];

      for (const recipient of recipients) {
        try {
          const mailOptions = {
            from: process.env.MAIL_USER || "noreply@jordanapps.tech",
            to: recipient.email || recipient,
            subject: subject,
            html: htmlContent,
          };

          const result = await transporter.sendMail(mailOptions);
          results.push({
            recipient: recipient.email || recipient,
            success: true,
            messageId: result.messageId,
          });
        } catch (error) {
          errors.push({
            recipient: recipient.email || recipient,
            error: error.message,
          });
        }
      }

      return {
        success: true,
        sent: results.length,
        failed: errors.length,
        results,
        errors,
      };
    } catch (error) {
      console.error("Error sending bulk emails:", error);
      throw error;
    }
  }

  // Send email with attachments
  static async sendEmailWithAttachments(to, subject, htmlContent, attachments) {
    try {
      const mailOptions = {
        from: process.env.MAIL_USER || "noreply@jordanapps.tech",
        to: to,
        subject: subject,
        html: htmlContent,
        attachments: attachments,
      };

      const result = await transporter.sendMail(mailOptions);
      console.log(
        "Email with attachments sent successfully:",
        result.messageId
      );
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error("Error sending email with attachments:", error);
      throw error;
    }
  }

  // Send password reset email
  static async sendPasswordResetEmail(userEmail, resetToken, resetUrl) {
    try {
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>Hello,</p>
          <p>You have requested to reset your password for Jordan Apps.</p>
          <p>Click the button below to reset your password:</p>
          <a href="${resetUrl}?token=${resetToken}" 
             style="display: inline-block; background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0;">
            Reset Password
          </a>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${resetUrl}?token=${resetToken}</p>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this password reset, please ignore this email.</p>
          <p>Best regards,<br>The Jordan Apps Team</p>
        </div>
      `;

      const mailOptions = {
        from: process.env.MAIL_USER || "noreply@jordanapps.tech",
        to: userEmail,
        subject: "Password Reset - Jordan Apps",
        html: htmlContent,
      };

      const result = await transporter.sendMail(mailOptions);
      console.log("Password reset email sent successfully:", result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error("Error sending password reset email:", error);
      throw error;
    }
  }

  // Send notification email
  static async sendNotificationEmail(
    userEmail,
    title,
    message,
    actionUrl = null
  ) {
    try {
      const actionButton = actionUrl
        ? `<a href="${actionUrl}" style="display: inline-block; background: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 15px 0;">View Details</a>`
        : "";

      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
          <h2 style="color: #333; margin-top: 0;">${title}</h2>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p style="margin: 0; line-height: 1.6;">${message}</p>
          </div>
          ${actionButton}
          <p style="color: #666; font-size: 14px; margin-top: 20px;">
            This is an automated notification from Jordan Apps.
          </p>
        </div>
      `;

      const mailOptions = {
        from: process.env.MAIL_USER || "noreply@jordanapps.tech",
        to: userEmail,
        subject: title,
        html: htmlContent,
      };

      const result = await transporter.sendMail(mailOptions);
      console.log("Notification email sent successfully:", result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error("Error sending notification email:", error);
      throw error;
    }
  }

  // Validate email address
  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

  // Get email configuration info (without sensitive data)
  static getEmailConfig() {
    return {
      host: process.env.EMAIL_HOST || "jordanapps.tech",
      port: parseInt(process.env.EMAIL_PORT) || 465,
      secure: process.env.MAIL_SECURE === "true" || true,
      user: process.env.MAIL_USER || "noreply@jordanapps.tech",
      adminEmail: process.env.ADMIN_EMAIL || "admin@jordanapps.tech",
    };
  }

  // Send system alert email
  static async sendSystemAlert(alertType, message, details = {}) {
    try {
      const adminEmail = process.env.ADMIN_EMAIL || "admin@jordanapps.tech";

      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #dc3545; border-radius: 8px; padding: 20px;">
          <h2 style="color: #dc3545; margin-top: 0;">🚨 System Alert: ${alertType}</h2>
          <div style="background: #f8d7da; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p style="margin: 0; line-height: 1.6;"><strong>Message:</strong> ${message}</p>
          </div>
          ${
            Object.keys(details).length > 0
              ? `
            <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <h4 style="margin-top: 0;">Details:</h4>
              <pre style="margin: 0; white-space: pre-wrap;">${JSON.stringify(
                details,
                null,
                2
              )}</pre>
            </div>
          `
              : ""
          }
          <p style="color: #666; font-size: 14px; margin-top: 20px;">
            This is an automated system alert from Jordan Apps.
          </p>
        </div>
      `;

      const mailOptions = {
        from: process.env.MAIL_USER || "noreply@jordanapps.tech",
        to: adminEmail,
        subject: `System Alert: ${alertType} - Jordan Apps`,
        html: htmlContent,
      };

      const result = await transporter.sendMail(mailOptions);
      console.log("System alert email sent successfully:", result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error("Error sending system alert email:", error);
      throw error;
    }
  }

  // Send welcome email to multiple users
  static async sendBulkWelcomeEmails(users) {
    try {
      const results = [];
      const errors = [];

      for (const user of users) {
        try {
          const result = await this.sendWelcomeEmail(user.name, user.email);
          results.push({
            user: user.email,
            success: true,
            messageId: result.messageId,
          });
        } catch (error) {
          errors.push({
            user: user.email,
            error: error.message,
          });
        }
      }

      return {
        success: true,
        sent: results.length,
        failed: errors.length,
        results,
        errors,
      };
    } catch (error) {
      console.error("Error sending bulk welcome emails:", error);
      throw error;
    }
  }
}

module.exports = EmailService;
