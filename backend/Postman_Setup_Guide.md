# Postman Setup Guide for Jordan Apps Email API

## 🚀 Quick Start

### 1. Environment Setup

**Important:** Before testing, ensure your backend environment is properly configured:

1. **Create `.env` file** in the `backend` directory:

   ```bash
   cp env.example .env
   ```

2. **Add your credentials** to the `.env` file:

   ```env
   EMAIL_HOST=jordanapps.tech
   EMAIL_PORT=465
   MAIL_SECURE=true
   MAIL_USER=noreply@jordanapps.tech
   MAIL_PASSWORD=your_actual_password_here
   ADMIN_EMAIL=admin@jordanapps.tech
   MONGO_URL=your_mongodb_connection_string
   PORT=3001
   ```

   **⚠️ CRITICAL SECURITY WARNING:**

   - The `MONGO_URL` contains database credentials that could allow full database access
   - Never share your actual MongoDB connection string
   - Each developer should use their own database instance for development

3. **Install dotenv** (if not already installed):
   ```bash
   npm install dotenv
   ```

### 2. Import Collection and Environment

1. **Open Postman**
2. **Import Collection:**

   - Click "Import" button
   - Select `Postman_Collection.json`
   - This will import all API endpoints

3. **Import Environment:**
   - Click "Import" button again
   - Select `Postman_Environment.json`
   - Select the environment from the dropdown in the top-right corner

### 3. Start the Backend Server

```bash
cd spa/backend
npm start
```

The server should start on `http://localhost:3001`

## 📧 Email API Testing

### Test 1: Email Connection Test

- **Endpoint:** `GET {{baseUrl}}/api/emails/test`
- **Purpose:** Verify SMTP connection is working
- **Expected Response:** `{"success": true, "message": "Email server connection successful"}`

### Test 2: Send Welcome Email

- **Endpoint:** `POST {{baseUrl}}/api/emails/welcome`
- **Body:**

```json
{
  "userName": "{{userName}}",
  "userEmail": "{{testEmail}}"
}
```

- **Purpose:** Send personalized welcome email
- **Expected Response:** `{"success": true, "messageId": "..."}`

### Test 3: Send Record Created Notification

- **Endpoint:** `POST {{baseUrl}}/api/emails/record-created`
- **Body:**

```json
{
  "recordData": {
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@example.com",
    "birthDate": "1990-05-15"
  },
  "adminEmail": "{{adminEmail}}"
}
```

- **Purpose:** Send notification when record is created
- **Expected Response:** `{"success": true, "messageId": "..."}`

### Test 4: Send Custom Email

- **Endpoint:** `POST {{baseUrl}}/api/emails/custom`
- **Body:**

```json
{
  "to": "{{testEmail}}",
  "subject": "Test Custom Email",
  "htmlContent": "<h1>Hello from Jordan Apps!</h1><p>This is a test custom email.</p>"
}
```

- **Purpose:** Send custom HTML email
- **Expected Response:** `{"success": true, "messageId": "..."}`

## 📊 Record API Testing

### Test 5: Create Record (Triggers Auto-Email)

- **Endpoint:** `POST {{baseUrl}}/api/records`
- **Body:**

```json
{
  "firstName": "Test",
  "lastName": "User",
  "email": "test.user@example.com",
  "birthDate": "1985-03-20"
}
```

- **Purpose:** Create new record (automatically sends email notification)
- **Expected Response:** Record object with ID

### Test 6: Get All Records

- **Endpoint:** `GET {{baseUrl}}/api/records`
- **Purpose:** Retrieve all records
- **Expected Response:** Array of record objects

## 🤝 Sharing with Collaborators

### Method 1: Export/Import Files

1. **Export your collection:**

   - Right-click collection → "Export"
   - Choose "Collection v2.1"
   - Save as `Jordan_Apps_Collection.json`

2. **Export your environment:**

   - Click environment settings (gear icon)
   - Click "Export"
   - Save as `Jordan_Apps_Environment.json`

3. **Share files with collaborator:**
   - Send both JSON files via email, Slack, or file sharing
   - **Also share `env.example`** for environment setup
   - **Never share your actual `.env` file**
   - Collaborator imports both files in Postman

### Method 2: Postman Workspace (Recommended)

1. **Create a Postman Workspace:**

   - Click "Workspaces" in top-left
   - Click "Create Workspace"
   - Name it "Jordan Apps Development"

2. **Add Collection to Workspace:**

   - Move your collection to the workspace
   - Right-click collection → "Move to Workspace"

3. **Invite Collaborator:**
   - Click workspace settings
   - Click "Invite people"
   - Enter collaborator's email
   - Choose role (Editor or Viewer)

### Method 3: Public Collection Link

1. **Publish Collection:**

   - Right-click collection → "Share"
   - Click "Get public link"
   - Share the link with collaborator

2. **Collaborator imports:**
   - Opens the link
   - Clicks "Import" in Postman

## 🔧 Environment Variables

### Local Development

- `baseUrl`: `http://localhost:3001`
- `testEmail`: `test@example.com`
- `adminEmail`: `admin@jordanapps.tech`
- `userName`: `Test User`
- `recordId`: (leave empty, set after creating records)

### Production (when deployed)

- `baseUrl`: `https://your-production-domain.com`
- Update other variables as needed

### Backend Environment Variables

| Variable        | Description                   | Example                 | Security Level |
| --------------- | ----------------------------- | ----------------------- | -------------- |
| `EMAIL_HOST`    | SMTP server hostname          | jordanapps.tech         | Low            |
| `EMAIL_PORT`    | SMTP server port              | 465                     | Low            |
| `MAIL_SECURE`   | Use SSL/TLS                   | true                    | Low            |
| `MAIL_USER`     | Email username (from address) | noreply@jordanapps.tech | Medium         |
| `MAIL_PASSWORD` | Email password                | your_password_here      | **High**       |
| `ADMIN_EMAIL`   | Default admin email           | admin@jordanapps.tech   | Low            |
| `MONGO_URL`     | MongoDB connection string     | mongodb+srv://...       | **Critical**   |

### Security Levels:

- **Low**: Public information, safe to share
- **Medium**: Semi-sensitive, avoid sharing
- **High**: Sensitive credentials, never share
- **Critical**: Database access, extremely sensitive

## 🧪 Testing Workflow

### Recommended Testing Order:

1. **Test Email Connection** - Verify SMTP is working
2. **Send Welcome Email** - Test basic email functionality
3. **Create Record** - Test automatic email trigger
4. **Send Custom Email** - Test flexible email sending
5. **Test Record APIs** - Verify full CRUD functionality

### Email Verification:

- Check your email inbox for received emails
- Verify email content and formatting
- Check spam folder if emails don't appear

## 🔐 Security Notes

### Environment Variables

- **Never commit `.env` files to version control**
- **Use `env.example` for sharing configuration structure**
- **Each developer should create their own `.env` file**
- **Keep credentials secure and private**
- **All email addresses are configurable via environment variables**
- **MongoDB connection string is CRITICAL - never share it**

### Postman Security

- **Don't include sensitive data in shared collections**
- **Use environment variables for dynamic values**
- **Consider using Postman's built-in security features**
- **Never share collections containing real credentials**

## 🐛 Troubleshooting

### Common Issues:

1. **Server not starting:**

   - Check if port 3001 is available
   - Verify all dependencies are installed (`npm install`)
   - Check console for error messages
   - Ensure `.env` file exists and has correct credentials
   - Verify `MONGO_URL` is set correctly

2. **Email not sending:**

   - Verify SMTP credentials in `.env` file
   - Check network connectivity
   - Verify email addresses are valid
   - Ensure `dotenv` is installed and loaded

3. **Collection import fails:**

   - Ensure JSON files are valid
   - Try importing collection and environment separately
   - Check Postman version compatibility

4. **Environment variables not working:**
   - Ensure environment is selected in top-right dropdown
   - Check variable names match exactly
   - Verify variable values are set
   - Ensure `.env` file is in the correct location

## 📱 Postman Mobile App

### For Mobile Testing:

1. **Install Postman Mobile App**
2. **Sync with Postman account**
3. **Import collection and environment**
4. **Test APIs on mobile device**

## 📞 Support

If you encounter issues:

1. Check the server console for error messages
2. Verify all environment variables are set correctly
3. Test individual endpoints to isolate problems
4. Check the backend logs for detailed error information
5. Ensure `.env` file is properly configured
6. Verify MongoDB connection string is correct
