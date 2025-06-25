# EmailService Class Documentation

## Overview

The `EmailService` class provides a comprehensive set of static methods for sending various types of emails in the Jordan Apps backend. All methods use environment variables for configuration and include proper error handling.

## Class Methods

### 1. `sendWelcomeEmail(userName, userEmail)`

Sends a personalized welcome email to new users.

**Parameters:**

- `userName` (string): The user's name
- `userEmail` (string): The user's email address

**Returns:** Promise with success status and message ID

**Example:**

```javascript
const result = await EmailService.sendWelcomeEmail(
  "John Doe",
  "john@example.com"
);
```

### 2. `sendRecordCreatedEmail(recordData, adminEmail)`

Sends a notification email when a new record is created.

**Parameters:**

- `recordData` (object): The record data object
- `adminEmail` (string, optional): Admin email (defaults to ADMIN_EMAIL env var)

**Returns:** Promise with success status and message ID

**Example:**

```javascript
const recordData = {
  firstName: "Jane",
  lastName: "Smith",
  email: "jane@example.com",
  birthDate: "1990-05-15",
};
const result = await EmailService.sendRecordCreatedEmail(recordData);
```

### 3. `sendCustomEmail(to, subject, htmlContent)`

Sends a custom HTML email.

**Parameters:**

- `to` (string): Recipient email address
- `subject` (string): Email subject
- `htmlContent` (string): HTML content of the email

**Returns:** Promise with success status and message ID

**Example:**

```javascript
const result = await EmailService.sendCustomEmail(
  "user@example.com",
  "Custom Subject",
  "<h1>Hello World</h1><p>This is a custom email.</p>"
);
```

### 4. `sendBulkEmails(recipients, subject, htmlContent)`

Sends the same email to multiple recipients.

**Parameters:**

- `recipients` (array): Array of email addresses or objects with email property
- `subject` (string): Email subject
- `htmlContent` (string): HTML content of the email

**Returns:** Promise with bulk sending results

**Example:**

```javascript
const recipients = [
  "user1@example.com",
  "user2@example.com",
  { email: "user3@example.com" },
];
const result = await EmailService.sendBulkEmails(
  recipients,
  "Bulk Email Subject",
  "<h1>Bulk Email</h1><p>This is sent to multiple recipients.</p>"
);
```

### 5. `sendEmailWithAttachments(to, subject, htmlContent, attachments)`

Sends an email with file attachments.

**Parameters:**

- `to` (string): Recipient email address
- `subject` (string): Email subject
- `htmlContent` (string): HTML content of the email
- `attachments` (array): Array of attachment objects

**Returns:** Promise with success status and message ID

**Example:**

```javascript
const attachments = [
  {
    filename: "document.pdf",
    path: "/path/to/document.pdf",
  },
  {
    filename: "image.jpg",
    content: fs.readFileSync("/path/to/image.jpg"),
  },
];
const result = await EmailService.sendEmailWithAttachments(
  "user@example.com",
  "Email with Attachments",
  "<h1>Please find attached files</h1>",
  attachments
);
```

### 6. `sendPasswordResetEmail(userEmail, resetToken, resetUrl)`

Sends a password reset email with a secure token.

**Parameters:**

- `userEmail` (string): User's email address
- `resetToken` (string): Secure reset token
- `resetUrl` (string): Base URL for password reset

**Returns:** Promise with success status and message ID

**Example:**

```javascript
const result = await EmailService.sendPasswordResetEmail(
  "user@example.com",
  "secure-reset-token-123",
  "https://yourapp.com/reset-password"
);
```

### 7. `sendNotificationEmail(userEmail, title, message, actionUrl)`

Sends a notification email with optional action button.

**Parameters:**

- `userEmail` (string): Recipient email address
- `title` (string): Notification title
- `message` (string): Notification message
- `actionUrl` (string, optional): URL for action button

**Returns:** Promise with success status and message ID

**Example:**

```javascript
const result = await EmailService.sendNotificationEmail(
  "user@example.com",
  "New Message Received",
  "You have received a new message from John Doe.",
  "https://yourapp.com/messages"
);
```

### 8. `sendSystemAlert(alertType, message, details)`

Sends a system alert email to admin.

**Parameters:**

- `alertType` (string): Type of alert (e.g., 'Error', 'Warning', 'Info')
- `message` (string): Alert message
- `details` (object, optional): Additional details

**Returns:** Promise with success status and message ID

**Example:**

```javascript
const result = await EmailService.sendSystemAlert(
  "Database Error",
  "Failed to connect to database",
  { errorCode: "DB001", timestamp: new Date().toISOString() }
);
```

### 9. `sendBulkWelcomeEmails(users)`

Sends welcome emails to multiple users.

**Parameters:**

- `users` (array): Array of user objects with name and email properties

**Returns:** Promise with bulk sending results

**Example:**

```javascript
const users = [
  { name: "John Doe", email: "john@example.com" },
  { name: "Jane Smith", email: "jane@example.com" },
];
const result = await EmailService.sendBulkWelcomeEmails(users);
```

### 10. `validateEmail(email)`

Validates an email address format.

**Parameters:**

- `email` (string): Email address to validate

**Returns:** Boolean indicating if email is valid

**Example:**

```javascript
const isValid = EmailService.validateEmail("user@example.com");
console.log(isValid); // true or false
```

### 11. `testConnection()`

Tests the SMTP connection.

**Parameters:** None

**Returns:** Promise with connection test results

**Example:**

```javascript
const result = await EmailService.testConnection();
```

### 12. `getEmailConfig()`

Gets email configuration (non-sensitive information).

**Parameters:** None

**Returns:** Object with email configuration

**Example:**

```javascript
const config = EmailService.getEmailConfig();
console.log(config);
// {
//   host: 'jordanapps.tech',
//   port: 465,
//   secure: true,
//   user: 'noreply@jordanapps.tech',
//   adminEmail: 'admin@jordanapps.tech'
// }
```

## API Endpoints

All EmailService methods are available through REST API endpoints:

### GET Endpoints

- `GET /api/emails/test` - Test email connection
- `GET /api/emails/config` - Get email configuration

### POST Endpoints

- `POST /api/emails/validate` - Validate email address
- `POST /api/emails/welcome` - Send welcome email
- `POST /api/emails/record-created` - Send record created notification
- `POST /api/emails/custom` - Send custom email
- `POST /api/emails/bulk` - Send bulk emails
- `POST /api/emails/attachments` - Send email with attachments
- `POST /api/emails/password-reset` - Send password reset email
- `POST /api/emails/notification` - Send notification email
- `POST /api/emails/system-alert` - Send system alert
- `POST /api/emails/bulk-welcome` - Send bulk welcome emails

## Error Handling

All methods include comprehensive error handling:

- **Validation errors**: Invalid email addresses, missing required fields
- **SMTP errors**: Connection failures, authentication issues
- **Network errors**: Timeout, connection refused
- **File errors**: Attachment issues

## Security Features

- **Environment variables**: All sensitive data stored in `.env` file
- **Email validation**: All email addresses validated before sending
- **Input sanitization**: HTML content properly handled
- **Error logging**: Detailed error logging without exposing sensitive data

## Usage Examples

### Basic Usage

```javascript
const EmailService = require("./emails/emailService");

// Send a simple welcome email
try {
  const result = await EmailService.sendWelcomeEmail(
    "John",
    "john@example.com"
  );
  console.log("Email sent:", result.messageId);
} catch (error) {
  console.error("Failed to send email:", error.message);
}
```

### Bulk Email Campaign

```javascript
const users = [
  { name: "Alice", email: "alice@example.com" },
  { name: "Bob", email: "bob@example.com" },
  { name: "Charlie", email: "charlie@example.com" },
];

const result = await EmailService.sendBulkWelcomeEmails(users);
console.log(`Sent: ${result.sent}, Failed: ${result.failed}`);
```

### System Monitoring

```javascript
// Send alert when database connection fails
try {
  await connectToDatabase();
} catch (error) {
  await EmailService.sendSystemAlert(
    "Database Connection Failed",
    "Unable to connect to MongoDB",
    { error: error.message, timestamp: new Date().toISOString() }
  );
}
```

## Best Practices

1. **Always validate email addresses** before sending
2. **Use try-catch blocks** for error handling
3. **Log email operations** for debugging
4. **Test email functionality** in development
5. **Monitor email delivery** in production
6. **Use environment variables** for configuration
7. **Implement rate limiting** for bulk emails
8. **Handle email bounces** and failures gracefully

## Dependencies

- `nodemailer`: SMTP email sending
- `dotenv`: Environment variable management
- Built-in Node.js modules for file handling and validation
