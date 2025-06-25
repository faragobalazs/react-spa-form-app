# Email Functionality

This module provides email sending capabilities for the Jordan Apps backend using Nodemailer.

## Features

- **Welcome Email**: Send personalized welcome emails to new users
- **Record Created Notification**: Automatically send notifications when new records are created
- **Custom Email**: Send custom HTML emails with any content
- **Email Connection Testing**: Test SMTP connection before sending emails

## Security Setup

### Environment Variables

All sensitive configuration is stored in environment variables. Create a `.env` file in the `backend` directory with the following variables:

```env
# Email Configuration
EMAIL_HOST=jordanapps.tech
EMAIL_PORT=465
MAIL_SECURE=true
MAIL_USER=noreply@jordanapps.tech
MAIL_PASSWORD=your_email_password_here
ADMIN_EMAIL=admin@jordanapps.tech

# MongoDB Configuration
MONGO_URL=your_mongodb_connection_string_here

# Server Configuration
PORT=3001
```

### Security Best Practices

- ✅ **Never commit `.env` files to version control**
- ✅ **Use environment variables for all sensitive data**
- ✅ **The `.env` file is already in `.gitignore**
- ✅ **Share `env.example` with collaborators for setup**
- ✅ **Centralized configuration for easy maintenance**
- ✅ **MongoDB credentials are protected from exposure**

### Critical Security Notes

- **MongoDB Connection String**: Contains database credentials that could allow full database access
- **Email Credentials**: SMTP credentials for sending emails
- **Never share these credentials** in public repositories or discussions
- **Each developer should have their own database instance** for development

## API Endpoints

### 1. Test Email Connection

```
GET /api/emails/test
```

Tests the SMTP connection and returns success/failure status.

### 2. Send Welcome Email

```
POST /api/emails/welcome
Content-Type: application/json

{
  "userName": "John Doe",
  "userEmail": "john.doe@example.com"
}
```

### 3. Send Record Created Notification

```
POST /api/emails/record-created
Content-Type: application/json

{
  "recordData": {
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@example.com",
    "birthDate": "1990-05-15"
  },
  "adminEmail": "admin@jordanapps.tech" // optional, defaults to ADMIN_EMAIL env var
}
```

### 4. Send Custom Email

```
POST /api/emails/custom
Content-Type: application/json

{
  "to": "recipient@example.com",
  "subject": "Custom Subject",
  "htmlContent": "<h1>Custom HTML Content</h1>"
}
```

## Email Templates

### Welcome Email Template

- Beautiful gradient header
- Personalized greeting with user name
- Account details section
- Call-to-action button
- Professional footer

### Record Created Email Template

- Success-themed design
- Complete record details
- Creation timestamp
- Professional styling

## Automatic Email Triggers

- **Record Creation**: When a new record is created via the `/api/records` POST endpoint, an automatic notification email is sent to the admin.

## Testing

Run the email test script to verify functionality:

```bash
node test-email.js
```

## Error Handling

- Email failures are logged but don't break the main application flow
- Connection errors are properly handled and reported
- Invalid email addresses are validated before sending

## Security

- SMTP credentials are stored in environment variables
- Email sending is non-blocking to prevent application slowdowns
- Input validation is performed on all email endpoints
- `.env` file is excluded from version control
- All email addresses are configurable via environment variables
- MongoDB connection string is protected from exposure

## Usage Examples

### Testing with Postman

1. **Test Connection**:

   ```
   GET http://localhost:3001/api/emails/test
   ```

2. **Send Welcome Email**:

   ```
   POST http://localhost:3001/api/emails/welcome
   Content-Type: application/json

   {
     "userName": "Test User",
     "userEmail": "test@example.com"
   }
   ```

3. **Send Record Created Email**:

   ```
   POST http://localhost:3001/api/emails/record-created
   Content-Type: application/json

   {
     "recordData": {
       "firstName": "John",
       "lastName": "Doe",
       "email": "john.doe@example.com",
       "birthDate": "1985-03-20"
     }
   }
   ```

## Setup for New Developers

1. **Clone the repository**
2. **Copy `env.example` to `.env`**:
   ```bash
   cp env.example .env
   ```
3. **Fill in your actual credentials** in the `.env` file
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Start the server**:
   ```bash
   npm start
   ```

## Environment Variables Reference

| Variable        | Description                                  | Default                 | Security Level |
| --------------- | -------------------------------------------- | ----------------------- | -------------- |
| `EMAIL_HOST`    | SMTP server hostname                         | jordanapps.tech         | Low            |
| `EMAIL_PORT`    | SMTP server port                             | 465                     | Low            |
| `MAIL_SECURE`   | Use SSL/TLS                                  | true                    | Low            |
| `MAIL_USER`     | Email username (also used as "from" address) | noreply@jordanapps.tech | Medium         |
| `MAIL_PASSWORD` | Email password                               | (required)              | **High**       |
| `ADMIN_EMAIL`   | Default admin email for notifications        | admin@jordanapps.tech   | Low            |
| `MONGO_URL`     | MongoDB connection string with credentials   | (required)              | **Critical**   |
| `PORT`          | Server port                                  | 3001                    | Low            |

### Security Levels:

- **Low**: Public information, safe to share
- **Medium**: Semi-sensitive, avoid sharing
- **High**: Sensitive credentials, never share
- **Critical**: Database access, extremely sensitive

## Dependencies

- `nodemailer`: For SMTP email sending
- `dotenv`: For environment variable management
- `express`: For API routing
- Built-in Node.js modules for date handling and error management
