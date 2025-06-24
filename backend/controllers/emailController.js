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
