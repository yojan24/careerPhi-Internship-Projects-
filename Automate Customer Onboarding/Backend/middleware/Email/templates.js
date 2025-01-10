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

export const freeCarQuote_Template = `<!DOCTYPE html>
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
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            font-size: 26px;
            color: #333;
            margin-bottom: 25px;
        }
        .section-title {
            font-size: 20px;
            color: #563A9C;
            margin-bottom: 10px;
            font-weight: bold;
        }
        .section-content {
            font-size: 16px;
            color: #333;
            line-height: 1.5;
            margin-bottom: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        table, th, td {
            border: 1px solid #ddd;
        }
        th {
            background-color: #563A9C;
            color: white;
            padding: 10px;
            text-align: left;
        }
        td {
            padding: 10px;
            text-align: left;
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
        <div class="header">Your Car Quotation</div>

        <p class="section-title">Hi {name},</p>

        <p class="section-content">Thank you for providing your details. Here’s the summary of your car insurance quote:</p>

        <p class="section-title">Car Information</p>
        <p class="section-content">
            <strong>Email:</strong> {email}<br>
            <strong>Car Number:</strong> {carNumber}<br>
            <strong>Variant:</strong> {carVariant}<br>
            <strong>Fuel Type:</strong> {fuel}<br>
        </p>

        <p class="section-title">Payment Details</p>
        <p class="section-content">
            <strong>Plan Type:</strong> {plan}<br>
            <strong>IDV (Insured Declared Value):</strong> {idvValue}<br>
            <strong>Premium Amount:</strong> {premiumAmount}<br>
            <strong>Select Plan Duration:</strong> {years} Year(s)
        </p>

        <p class="section-title">Payment Summary</p>
        <table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Plan Type:</strong></td>
                    <td>{plan}</td>
                </tr>
                <tr>
                    <td><strong>IDV Cover:</strong></td>
                    <td>{idvValue}</td>
                </tr>
                <tr>
                    <td><strong>Premium Amount:</strong></td>
                    <td>{premiumAmount}</td>
                </tr>
                <tr>
                    <td><strong>GST @18%:</strong></td>
                    <td>{gst}</td>
                </tr>
                <tr style="border-top: 2px solid #ddd;">
                    <td><strong>Total Payable:</strong></td>
                    <td>{totalAmount}</td>
                </tr>
            </tbody>
        </table>

        <p class="footer">If you have any questions or need further assistance, feel free to reach out to our customer support team at <a href="mailto:support@example.com">support@example.com</a>.</p>
        <div class="footer">
            <p>Thank you for choosing Ensure!</p>
            <p>The Ensure Team</p>
        </div>
    </div>
</body>
</html>
`;

export const freeHealthQuote_template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Health Insurance Quote</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 650px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 35px;
            border-radius: 12px;
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            font-size: 28px;
            color: #4A4A4A;
            margin-bottom: 25px;
        }
        .section-title {
            font-size: 22px;
            color: #563A9C;
            margin-bottom: 12px;
            font-weight: 600;
        }
        .section-content {
            font-size: 16px;
            color: #333;
            line-height: 1.6;
            margin-bottom: 20px;
        }
        .section-content strong {
            font-weight: bold;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 25px;
        }
        table, th, td {
            border: 1px solid #ddd;
        }
        th {
            background-color: #563A9C;
            color: white;
            padding: 12px;
            text-align: left;
            font-weight: bold;
        }
        td {
            padding: 12px;
            text-align: left;
            color: #4A4A4A;
        }
        .total-row td {
            font-weight: bold;
            border-top: 2px solid #ddd;
        }
        .cta-button {
            display: inline-block;
            padding: 12px 25px;
            background-color: #563A9C;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            text-align: center;
            margin-top: 20px;
        }
        .cta-button:hover {
            background-color: #45338e;
        }
        .footer {
            text-align: center;
            font-size: 14px;
            color: #777;
            margin-top: 40px;
        }
        .footer a {
            color: #563A9C;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">Your Health Insurance Quote</div>

        <p class="section-title">Hi {name},</p>

        <p class="section-content">Thank you for providing your details. Below is the summary of your health insurance quote:</p>

        <p class="section-title">Personal Information</p>
        <p class="section-content">
            <strong>Email:</strong> {email}<br>
            <strong>Full Name:</strong> {name}<br>
            <strong>Existing Illnesses:</strong> {disease}<br>
        </p>

        <p class="section-title">Plan and Payment Details</p>
        <p class="section-content">
            <strong>IDV (Insured Declared Value):</strong> ₹{idv}<br>
            <strong>Plan Duration:</strong> {years} Year(s)<br>
            <strong>Premium Amount:</strong> ₹{Premium}<br>
        </p>

        <p class="section-title">Payment Summary</p>
        <table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>IDV Cover:</strong></td>
                    <td>₹{idv}</td>
                </tr>
                <tr>
                    <td><strong>Premium Amount:</strong></td>
                    <td>₹{Premium}</td>
                </tr>
                <tr>
                    <td><strong>GST @18%:</strong></td>
                    <td>₹ {gst}</td>
                </tr>
                <tr class="total-row">
                    <td><strong>Total Payable:</strong></td>
                    <td>₹{totalAmount}</td>
                </tr>
            </tbody>
        </table>

      

        <p class="footer">If you have any questions or need further assistance, feel free to reach out to our customer support team at <a href="mailto:support@example.com">support@example.com</a>.</p>
        <div class="footer">
            <p>Thank you for choosing Ensure Health Insurance!</p>
            <p>The Ensure Health Team</p>
        </div>
    </div>
</body>
</html>
`;
