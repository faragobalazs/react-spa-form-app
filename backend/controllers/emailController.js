const EmailService = require("../emails/emailService");
const { BadRequestError, UnprocessableEntityError } = require("../errors");

// Test email connection
exports.testEmailConnection = async (req, res) => {
  const result = await EmailService.testConnection();
  res.json(result);
};

// Send welcome email
exports.sendWelcomeEmail = async (req, res) => {
  const { userName, userEmail } = req.body;

  if (!userName || !userEmail) {
    throw new BadRequestError("userName and userEmail are required");
  }

  // Validate email
  if (!EmailService.validateEmail(userEmail)) {
    throw new BadRequestError("Invalid email address");
  }

  const result = await EmailService.sendWelcomeEmail(userName, userEmail);
  res.json(result);
};

// Send record created notification
exports.sendRecordCreatedEmail = async (req, res) => {
  const { recordData, adminEmail } = req.body;

  if (!recordData) {
    throw new BadRequestError("recordData is required");
  }

  const result = await EmailService.sendRecordCreatedEmail(
    recordData,
    adminEmail
  );
  res.json(result);
};

// Send custom email
exports.sendCustomEmail = async (req, res) => {
  const { to, subject, htmlContent } = req.body;

  if (!to || !subject || !htmlContent) {
    throw new BadRequestError("to, subject, and htmlContent are required");
  }

  // Validate email
  if (!EmailService.validateEmail(to)) {
    throw new BadRequestError("Invalid email address");
  }

  const result = await EmailService.sendCustomEmail(to, subject, htmlContent);
  res.json(result);
};

// Send bulk emails
exports.sendBulkEmails = async (req, res) => {
  const { recipients, subject, htmlContent } = req.body;

  if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
    throw new BadRequestError(
      "recipients array is required and must not be empty"
    );
  }

  if (!subject || !htmlContent) {
    throw new BadRequestError("subject and htmlContent are required");
  }

  // Validate all email addresses
  const invalidEmails = recipients.filter((recipient) => {
    const email = recipient.email || recipient;
    return !EmailService.validateEmail(email);
  });

  if (invalidEmails.length > 0) {
    throw new UnprocessableEntityError("Invalid email addresses found");
  }

  const result = await EmailService.sendBulkEmails(
    recipients,
    subject,
    htmlContent
  );
  res.json(result);
};

// Send email with attachments
exports.sendEmailWithAttachments = async (req, res) => {
  const { to, subject, htmlContent, attachments } = req.body;

  if (!to || !subject || !htmlContent) {
    throw new BadRequestError("to, subject, and htmlContent are required");
  }

  if (!attachments || !Array.isArray(attachments)) {
    throw new BadRequestError("attachments array is required");
  }

  // Validate email
  if (!EmailService.validateEmail(to)) {
    throw new BadRequestError("Invalid email address");
  }

  const result = await EmailService.sendEmailWithAttachments(
    to,
    subject,
    htmlContent,
    attachments
  );
  res.json(result);
};

// Send password reset email
exports.sendPasswordResetEmail = async (req, res) => {
  const { userEmail, resetToken, resetUrl } = req.body;

  if (!userEmail || !resetToken || !resetUrl) {
    throw new BadRequestError(
      "userEmail, resetToken, and resetUrl are required"
    );
  }

  // Validate email
  if (!EmailService.validateEmail(userEmail)) {
    throw new BadRequestError("Invalid email address");
  }

  const result = await EmailService.sendPasswordResetEmail(
    userEmail,
    resetToken,
    resetUrl
  );
  res.json(result);
};

// Send invitation email
exports.sendInvitationEmail = async (req, res) => {
  const { inviteeEmail, inviterName, invitationUrl, role } = req.body;

  if (!inviteeEmail || !inviterName || !invitationUrl) {
    throw new BadRequestError(
      "inviteeEmail, inviterName, and invitationUrl are required"
    );
  }

  // Validate email
  if (!EmailService.validateEmail(inviteeEmail)) {
    throw new BadRequestError("Invalid email address");
  }

  const result = await EmailService.sendInvitationEmail(
    inviteeEmail,
    inviterName,
    invitationUrl,
    role
  );
  res.json(result);
};

// Send notification email
exports.sendNotificationEmail = async (req, res) => {
  const { userEmail, notificationType, notificationData } = req.body;

  if (!userEmail || !notificationType) {
    throw new BadRequestError("userEmail and notificationType are required");
  }

  // Validate email
  if (!EmailService.validateEmail(userEmail)) {
    throw new BadRequestError("Invalid email address");
  }

  const result = await EmailService.sendNotificationEmail(
    userEmail,
    notificationType,
    notificationData
  );
  res.json(result);
};

// Get email templates
exports.getEmailTemplates = async (req, res) => {
  const templates = await EmailService.getEmailTemplates();
  res.json(templates);
};

// Update email template
exports.updateEmailTemplate = async (req, res) => {
  const { templateName, subject, htmlContent } = req.body;

  if (!templateName || !subject || !htmlContent) {
    throw new BadRequestError(
      "templateName, subject, and htmlContent are required"
    );
  }

  const result = await EmailService.updateEmailTemplate(
    templateName,
    subject,
    htmlContent
  );
  res.json(result);
};

// Test email template
exports.testEmailTemplate = async (req, res) => {
  const { templateName, testData } = req.body;

  if (!templateName) {
    throw new BadRequestError("templateName is required");
  }

  const result = await EmailService.testEmailTemplate(templateName, testData);
  res.json(result);
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
