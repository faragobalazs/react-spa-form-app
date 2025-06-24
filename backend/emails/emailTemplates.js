// Email templates
const createWelcomeEmailTemplate = (userName, userEmail) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Jordan Apps</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 300;
        }
        .content {
            padding: 40px 20px;
            text-align: center;
        }
        .welcome-message {
            font-size: 18px;
            color: #333;
            margin-bottom: 30px;
            line-height: 1.6;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 25px;
            font-weight: bold;
            margin: 20px 0;
            transition: transform 0.3s ease;
        }
        .cta-button:hover {
            transform: translateY(-2px);
        }
        .footer {
            background-color: #f8f9fa;
            padding: 30px 20px;
            text-align: center;
            color: #666;
            font-size: 14px;
        }
        .social-links {
            margin: 20px 0;
        }
        .social-links a {
            color: #667eea;
            text-decoration: none;
            margin: 0 10px;
        }
        .user-info {
            background-color: #f8f9fa;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
            border-left: 4px solid #667eea;
        }
        .user-info p {
            margin: 5px 0;
            color: #555;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Welcome to Jordan Apps</h1>
            <p>We're excited to have you on board!</p>
        </div>
        
        <div class="content">
            <div class="welcome-message">
                <p>Hello <strong>${userName}</strong>,</p>
                <p>Thank you for joining Jordan Apps! We're thrilled to welcome you to our community.</p>
                <p>Your account has been successfully created and you're now ready to explore all the amazing features we have to offer.</p>
            </div>
            
            <div class="user-info">
                <p><strong>Account Details:</strong></p>
                <p>Name: ${userName}</p>
                <p>Email: ${userEmail}</p>
                <p>Registration Date: ${new Date().toLocaleDateString()}</p>
            </div>
            
            <a href="#" class="cta-button">Get Started</a>
            
            <p style="margin-top: 30px; color: #666;">
                If you have any questions, feel free to reach out to our support team.
            </p>
        </div>
        
        <div class="footer">
            <p>&copy; 2024 Jordan Apps. All rights reserved.</p>
            <div class="social-links">
                <a href="#">Website</a> |
                <a href="#">Support</a> |
                <a href="#">Privacy Policy</a>
            </div>
            <p>This email was sent to ${userEmail}</p>
        </div>
    </div>
</body>
</html>
  `;
};

const createRecordCreatedEmailTemplate = (recordData) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Record Created - Jordan Apps</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        .header {
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 300;
        }
        .content {
            padding: 40px 20px;
            text-align: center;
        }
        .success-message {
            font-size: 18px;
            color: #333;
            margin-bottom: 30px;
            line-height: 1.6;
        }
        .record-details {
            background-color: #f8f9fa;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
            border-left: 4px solid #28a745;
            text-align: left;
        }
        .record-details h3 {
            margin-top: 0;
            color: #28a745;
        }
        .record-details p {
            margin: 8px 0;
            color: #555;
        }
        .footer {
            background-color: #f8f9fa;
            padding: 30px 20px;
            text-align: center;
            color: #666;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Record Successfully Created</h1>
            <p>Your data has been saved successfully!</p>
        </div>
        
        <div class="content">
            <div class="success-message">
                <p>A new record has been created in your Jordan Apps database.</p>
            </div>
            
            <div class="record-details">
                <h3>Record Details:</h3>
                <p><strong>First Name:</strong> ${recordData.firstName}</p>
                <p><strong>Last Name:</strong> ${recordData.lastName}</p>
                <p><strong>Email:</strong> ${recordData.email}</p>
                <p><strong>Birth Date:</strong> ${new Date(
                  recordData.birthDate
                ).toLocaleDateString()}</p>
                <p><strong>Created:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <p style="margin-top: 30px; color: #666;">
                You can view and manage all your records through the Jordan Apps dashboard.
            </p>
        </div>
        
        <div class="footer">
            <p>&copy; 2024 Jordan Apps. All rights reserved.</p>
            <p>This is an automated notification from Jordan Apps.</p>
        </div>
    </div>
</body>
</html>
  `;
};

module.exports = {
  createWelcomeEmailTemplate,
  createRecordCreatedEmailTemplate,
};
