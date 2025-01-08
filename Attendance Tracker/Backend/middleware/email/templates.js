export const OTPTemp = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #e9eff1;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .email-container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            font-size: 26px;
            font-weight: bold;
            color: #3e8e41;
            margin-bottom: 30px;
        }
        .otp-container {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 20px 0;
        }
        .otp {
            background-color: #f7f7f7;
            padding: 20px;
            font-size: 28px;
            font-weight: bold;
            color: #2c3e50;
            border-radius: 8px;
            letter-spacing: 2px;
            border: 1px solid #ddd;
            text-align: center;
        }
        .footer {
            text-align: center;
            font-size: 15px;
            color: #7d7d7d;
            margin-top: 20px;
            line-height: 1.5;
        }
        .footer a {
            color: #3e8e41;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">OTP Verification</div>

        <p>Hello,</p>
        <p>We received a request to verify your identity. Please use the OTP below:</p>

        <div class="otp-container">
            <div class="otp">{verificationCode}</div>
        </div>

        <p>This OTP will expire in 10 minutes. If you did not request this, please ignore this email.</p>

        <div class="footer">
            <p>Thank you for using our service!</p>
            <p>For any assistance, visit our <a href="#">Help Center</a>.</p>
        </div>
    </div>
</body>
</html>
`;

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
            color: #888;<!DOCTYPE html>
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
        <p class="message">Thank you for signing up with us! We're excited to have you on board.</p>

        <p class="message">Your Employee ID is: <strong>{employeeId}</strong></p>

        <p class="message">Please use this Employee ID to log in to your account and start exploring our features.</p>
        <p class="message"><strong>Important:</strong> Do not share your Employee ID with anyone. This ID is confidential and will be used for logging in to your account.</p>

        <p class="message">If you need any help or have any questions, feel free to contact our support team at <a href="mailto:support@example.com">support@example.com</a>.</p>

        <div class="footer">
            <p>Thank you for choosing us!</p>
            <p>The Team</p>
        </div>
    </div>
</body>
</html>
`;
