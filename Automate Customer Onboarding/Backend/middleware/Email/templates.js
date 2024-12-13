export const OTPTemp = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 500px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            font-size: 24px;
            color: #333;
            margin-bottom: 20px;
        }
        .otp {
            background-color: #f1f1f1;
            padding: 15px;
            font-size: 24px;
            text-align: center;
            font-weight: bold;
            color: #333;
            border-radius: 5px;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            font-size: 14px;
            color: #888;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">OTP Verification</div>

        <p>Hello,</p>
        <p>We received a request to verify your identity. Please use the OTP below:</p>

        <div class="otp">{verificationCode}</div>

        <p>This OTP will expire in 10 minutes. If you did not request this, please ignore this email.</p>

        <div class="footer">
            <p>Thank you for using our service!</p>
        </div>
    </div>
</body>
</html>`;

export const welcomeTmp = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our Service</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 500px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            font-size: 24px;
            color: #333;
            margin-bottom: 20px;
        }
        .message {
            font-size: 16px;
            color: #333;
            line-height: 1.5;
        }
        .footer {
            text-align: center;
            font-size: 14px;
            color: #888;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">Welcome to Our Service!</div>

        <p class="message">Hi {name},</p>
        <p class="message">Thank you for signing up with us! We're excited to have you on board. You can now start exploring our features and enjoy all the benefits we offer.</p>

        <p class="message">If you need any help or have any questions, feel free to contact our support team at <a href="mailto:support@example.com">support@example.com</a>.</p>

        <div class="footer">
            <p>Thank you for choosing us!</p>
            <p>The Ensure Team</p>
        </div>
    </div>
</body>
</html>
`;

export const applyCar = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Car Insurance Application Successful</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 500px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            font-size: 24px;
            color: #333;
            margin-bottom: 20px;
        }
        .message {
            font-size: 16px;
            color: #333;
            line-height: 1.5;
        }
        .footer {
            text-align: center;
            font-size: 14px;
            color: #888;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">Your Car Insurance Application was Successful!</div>

        <p class="message">Hi {name},</p>
        <p class="message">Congratulations! Your application for car insurance has been successfully processed. We are excited to have you as part of our insured family. Your coverage is now active, and you can drive with peace of mind knowing you're protected.</p>

        <p class="message">If you have any questions or need assistance with your policy, please feel free to reach out to our customer support team at <a href="mailto:support@example.com">support@example.com</a>.</p>

        <div class="footer">
            <p>Thank you for choosing us for your car insurance needs!</p>
            <p>The Ensure Team</p>
        </div>
    </div>
</body>
</html>`;

export const applyhealth = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Health Insurance Application Successful</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 500px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            font-size: 24px;
            color: #333;
            margin-bottom: 20px;
        }
        .message {
            font-size: 16px;
            color: #333;
            line-height: 1.5;
        }
        .footer {
            text-align: center;
            font-size: 14px;
            color: #888;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">Your Health Insurance Application was Successful!</div>

        <p class="message">Hi {name},</p>
        <p class="message">Congratulations! Your application for health insurance has been successfully processed. We're pleased to inform you that your coverage is now active. You are now protected with comprehensive health coverage, giving you peace of mind in times of need.</p>

        <p class="message">If you have any questions or need assistance with your health policy, feel free to contact our support team at <a href="mailto:support@example.com">support@example.com</a>.</p>

        <div class="footer">
            <p>Thank you for trusting us with your health coverage!</p>
            <p>The Ensure Team</p>
        </div>
    </div>
</body>
</html>
`;

export const applyKYCtmp = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KYC Application Successfully Submitted</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 500px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            font-size: 24px;
            color: #333;
            margin-bottom: 20px;
        }
        .message {
            font-size: 16px;
            color: #333;
            line-height: 1.5;
        }
        .footer {
            text-align: center;
            font-size: 14px;
            color: #888;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">Your KYC Application was Successfully Submitted!</div>

        <p class="message">Hi {name},</p>
        <p class="message">We are pleased to inform you that your KYC application has been successfully submitted. Your application is now under review, and it will take up to 48 hours for us to process your details. You will be notified once the verification process is complete.</p>

        <p class="message">If you have any questions or need assistance, please don't hesitate to reach out to our support team at <a href="mailto:support@example.com">support@example.com</a>.</p>

        <div class="footer">
            <p>Thank you for submitting your KYC details!</p>
            <p>The Ensure Team</p>
        </div>
    </div>
</body>
</html>
`;

export const applyKycStatusTemplate = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>{subject}</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .email-container {
              max-width: 500px;
              margin: 40px auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
              text-align: center;
              font-size: 24px;
              color: #333;
              margin-bottom: 20px;
          }
          .message {
              font-size: 16px;
              color: #333;
              line-height: 1.5;
          }
          .footer {
              text-align: center;
              font-size: 14px;
              color: #888;
              margin-top: 20px;
          }
      </style>
  </head>
  <body>
      <div class="email-container">
          <div class="header">{subject}</div>
  
          <p class="message">Hi {name},</p>
          <p class="message">{content}</p>
  
          <p class="message">If you have any questions or need further assistance, feel free to reach out to our customer support team at <a href="mailto:support@example.com">support@example.com</a>.</p>
  
          <div class="footer">
              <p>Thank you for completing your KYC process!</p>
              <p>The Ensure Team</p>
          </div>
      </div>
  </body>
  </html>
  `;
