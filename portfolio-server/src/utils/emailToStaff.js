const { sendEmail } = require('./emailService');

class EmailService {
  static async EmailToStaff(email, password, firstName, lastName) {

    const to = email;
    const subject = 'Welcome to JDU';

    const text = `Hi ${firstName},\n\nWelcome to JDU. Your account has been created.\n\nYour login details are as follows:\n\nEmail: ${email}\nPassword: ${password}\n\nPlease keep this information secure and do not share it with anyone.\n\nBest regards,\nJDU Team`;

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Account Details</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              .email-container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  padding: 20px;
                  border: 1px solid #e1e1e1;
                  border-radius: 10px;
              }
              .header {
                  text-align: center;
                  padding: 10px 0;
                  background-color: #4CAF50;
                  color: #ffffff;
                  border-radius: 10px 10px 0 0;
              }
              .content {
                  padding: 20px;
                  line-height: 1.6;
              }
              .content p {
                  margin: 0 0 10px;
              }
              .content a {
                  color: #4CAF50;
                  text-decoration: none;
              }
              .content a:hover {
                  text-decoration: underline;
              }
              .footer {
                  text-align: center;
                  padding: 10px;
                  background-color: #f4f4f4;
                  color: #666666;
                  border-radius: 0 0 10px 10px;
              }
          </style>
      </head>
      <body>
          <div class="email-container">
              <div class="header">
                  <h1>Welcome to JDU</h1>
              </div>
              <div class="content">
                  <p>Dear ${firstName} ${lastName},</p>
                  <p>We are excited to have you join our team! Below are your account details:</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Password:</strong> ${password}</p>
                  <p>Please keep this information secure and do not share it with anyone.</p>
                  <p>You can log in to your account by clicking the link below:</p>
                  <p><a href="https://your-login-url.com">Login to Your Account</a></p>
                  <p>If you have any questions or need further assistance, please feel free to contact our support team.</p>
                  <p>Best regards,</p>
                  <p>JDU Team</p>
              </div>
              <div class="footer">
                  <p>&copy; ${new Date().getFullYear()} JDU. All rights reserved.</p>
                  <p>JDU Address</p>
              </div>
          </div>
      </body>
      </html>
    `;

    await sendEmail(to, subject, text, html);

    return "Email sent successfully";
  }
}

module.exports = EmailService;
