# Email Functionality

This module provides email sending capabilities for the Jordan Apps backend using Nodemailer.

## Features

- **Welcome Email**: Send personalized welcome emails to new users
- **Record Created Notification**: Automatically send notifications when new records are created
- **Custom Email**: Send custom HTML emails with any content
- **Email Connection Testing**: Test SMTP connection before sending emails

## Configuration

The email configuration is set up in `emailConfig.js` with the following SMTP settings:

- **Host**: jordanapps.tech
- **Port**: 465
- **Secure**: true
- **User**: noreply@jordanapps.tech
- **Password**: Q(+ttIt+pgC2

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
  "adminEmail": "admin@jordanapps.tech" // optional
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

- SMTP credentials are stored in the configuration file
- Email sending is non-blocking to prevent application slowdowns
- Input validation is performed on all email endpoints

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

## Dependencies

- `nodemailer`: For SMTP email sending
- `express`: For API routing
- Built-in Node.js modules for date handling and error management
