const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");

// Test email connection
router.get("/test", emailController.testEmailConnection);

// Send welcome email
router.post("/welcome", emailController.sendWelcomeEmail);

// Send record created notification
router.post("/record-created", emailController.sendRecordCreatedEmail);

// Send custom email
router.post("/custom", emailController.sendCustomEmail);

module.exports = router;
