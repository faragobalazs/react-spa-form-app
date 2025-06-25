const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");

// Test email connection
router.get("/test", emailController.testEmailConnection);

// Get email configuration (non-sensitive info)
router.get("/config", emailController.getEmailConfig);

// Validate email address
router.post("/validate", emailController.validateEmail);

// Send welcome email
router.post("/welcome", emailController.sendWelcomeEmail);

// Send record created notification
router.post("/record-created", emailController.sendRecordCreatedEmail);

// Send custom email
router.post("/custom", emailController.sendCustomEmail);

// Send bulk emails
router.post("/bulk", emailController.sendBulkEmails);

// Send email with attachments
router.post("/attachments", emailController.sendEmailWithAttachments);

// Send password reset email
router.post("/password-reset", emailController.sendPasswordResetEmail);

// Send notification email
router.post("/notification", emailController.sendNotificationEmail);

// Send system alert
router.post("/system-alert", emailController.sendSystemAlert);

// Send bulk welcome emails
router.post("/bulk-welcome", emailController.sendBulkWelcomeEmails);

module.exports = router;
