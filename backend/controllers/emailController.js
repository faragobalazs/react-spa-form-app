const EmailService = require("../emails/emailService");

// Test email connection
exports.testEmailConnection = async (req, res) => {
  try {
    const result = await EmailService.testConnection();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Email connection test failed",
      error: error.message,
    });
  }
};

// Send welcome email
exports.sendWelcomeEmail = async (req, res) => {
  try {
    const { userName, userEmail } = req.body;

    if (!userName || !userEmail) {
      return res.status(400).json({
        success: false,
        message: "userName and userEmail are required",
      });
    }

    // Validate email
    if (!EmailService.validateEmail(userEmail)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    const result = await EmailService.sendWelcomeEmail(userName, userEmail);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send welcome email",
      error: error.message,
    });
  }
};

// Send record created notification
exports.sendRecordCreatedEmail = async (req, res) => {
  try {
    const { recordData, adminEmail } = req.body;

    if (!recordData) {
      return res.status(400).json({
        success: false,
        message: "recordData is required",
      });
    }

    const result = await EmailService.sendRecordCreatedEmail(
      recordData,
      adminEmail
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send record created email",
      error: error.message,
    });
  }
};

// Send custom email
exports.sendCustomEmail = async (req, res) => {
  try {
    const { to, subject, htmlContent } = req.body;

    if (!to || !subject || !htmlContent) {
      return res.status(400).json({
        success: false,
        message: "to, subject, and htmlContent are required",
      });
    }

    // Validate email
    if (!EmailService.validateEmail(to)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    const result = await EmailService.sendCustomEmail(to, subject, htmlContent);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send custom email",
      error: error.message,
    });
  }
};

// Send bulk emails
exports.sendBulkEmails = async (req, res) => {
  try {
    const { recipients, subject, htmlContent } = req.body;

    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({
        success: false,
        message: "recipients array is required and must not be empty",
      });
    }

    if (!subject || !htmlContent) {
      return res.status(400).json({
        success: false,
        message: "subject and htmlContent are required",
      });
    }

    // Validate all email addresses
    const invalidEmails = recipients.filter((recipient) => {
      const email = recipient.email || recipient;
      return !EmailService.validateEmail(email);
    });

    if (invalidEmails.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid email addresses found",
        invalidEmails,
      });
    }

    const result = await EmailService.sendBulkEmails(
      recipients,
      subject,
      htmlContent
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send bulk emails",
      error: error.message,
    });
  }
};

// Send email with attachments
exports.sendEmailWithAttachments = async (req, res) => {
  try {
    const { to, subject, htmlContent, attachments } = req.body;

    if (!to || !subject || !htmlContent) {
      return res.status(400).json({
        success: false,
        message: "to, subject, and htmlContent are required",
      });
    }

    if (!attachments || !Array.isArray(attachments)) {
      return res.status(400).json({
        success: false,
        message: "attachments array is required",
      });
    }

    // Validate email
    if (!EmailService.validateEmail(to)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    const result = await EmailService.sendEmailWithAttachments(
      to,
      subject,
      htmlContent,
      attachments
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send email with attachments",
      error: error.message,
    });
  }
};

// Send password reset email
exports.sendPasswordResetEmail = async (req, res) => {
  try {
    const { userEmail, resetToken, resetUrl } = req.body;

    if (!userEmail || !resetToken || !resetUrl) {
      return res.status(400).json({
        success: false,
        message: "userEmail, resetToken, and resetUrl are required",
      });
    }

    // Validate email
    if (!EmailService.validateEmail(userEmail)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    const result = await EmailService.sendPasswordResetEmail(
      userEmail,
      resetToken,
      resetUrl
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send password reset email",
      error: error.message,
    });
  }
};

// Send notification email
exports.sendNotificationEmail = async (req, res) => {
  try {
    const { userEmail, title, message, actionUrl } = req.body;

    if (!userEmail || !title || !message) {
      return res.status(400).json({
        success: false,
        message: "userEmail, title, and message are required",
      });
    }

    // Validate email
    if (!EmailService.validateEmail(userEmail)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    const result = await EmailService.sendNotificationEmail(
      userEmail,
      title,
      message,
      actionUrl
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send notification email",
      error: error.message,
    });
  }
};

// Send system alert
exports.sendSystemAlert = async (req, res) => {
  try {
    const { alertType, message, details } = req.body;

    if (!alertType || !message) {
      return res.status(400).json({
        success: false,
        message: "alertType and message are required",
      });
    }

    const result = await EmailService.sendSystemAlert(
      alertType,
      message,
      details
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send system alert",
      error: error.message,
    });
  }
};

// Send bulk welcome emails
exports.sendBulkWelcomeEmails = async (req, res) => {
  try {
    const { users } = req.body;

    if (!users || !Array.isArray(users) || users.length === 0) {
      return res.status(400).json({
        success: false,
        message: "users array is required and must not be empty",
      });
    }

    // Validate all users have required fields
    const invalidUsers = users.filter((user) => !user.name || !user.email);
    if (invalidUsers.length > 0) {
      return res.status(400).json({
        success: false,
        message: "All users must have name and email fields",
        invalidUsers,
      });
    }

    // Validate all email addresses
    const invalidEmails = users.filter(
      (user) => !EmailService.validateEmail(user.email)
    );
    if (invalidEmails.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid email addresses found",
        invalidEmails,
      });
    }

    const result = await EmailService.sendBulkWelcomeEmails(users);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send bulk welcome emails",
      error: error.message,
    });
  }
};

// Get email configuration (non-sensitive info)
exports.getEmailConfig = async (req, res) => {
  try {
    const config = EmailService.getEmailConfig();
    res.json({
      success: true,
      config,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get email configuration",
      error: error.message,
    });
  }
};

// Validate email address
exports.validateEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "email is required",
      });
    }

    const isValid = EmailService.validateEmail(email);
    res.json({
      success: true,
      email,
      isValid,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to validate email",
      error: error.message,
    });
  }
};
