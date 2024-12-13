import { transpoter } from "./config.js";
import {
  OTPTemp,
  welcomeTmp,
  applyCar,
  applyhealth,
  applyKYCtmp,
  applyKycStatusTemplate,
} from "./templates.js";
import dotenv from "dotenv";
dotenv.config();

export const sendMail = async (email, verificationCode) => {
  try {
    const info = await transpoter.sendMail({
      from: `"Ensure" <${process.env.MAIL_ID}>`,
      to: email,
      subject: "Verify your email",
      text: "Verify your email",
      html: OTPTemp.replace("{verificationCode}", verificationCode),
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const welcomeMail = async (email, name) => {
  try {
    const info = await transpoter.sendMail({
      from: `"Ensure" <${process.env.MAIL_ID}>`,
      to: email,
      subject: "Welcome Email",
      text: "Welcome email",
      html: welcomeTmp.replace("{name}", name),
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const applycarmail = async (email, name) => {
  try {
    const info = await transpoter.sendMail({
      from: `"Ensure" <${process.env.MAIL_ID}>`,
      to: email,
      subject: "Car Insurance Application Successful",
      text: "Your car insurance application has been successfully processed.",
      html: applyCar.replace("{name}", name),
    });
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.log("Error sending email: ", error.message);
  }
};
export const applyhealthmail = async (email, name) => {
  try {
    const info = await transpoter.sendMail({
      from: `"Ensure" <${process.env.MAIL_ID}>`,
      to: email,
      subject: "Car Insurance Application Successful",
      text: "Your car insurance application has been successfully processed.",
      html: applyhealth.replace("{name}", name),
    });
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.log("Error sending email: ", error.message);
  }
};

export const applyKycmail = async (email, name) => {
  try {
    const info = await transpoter.sendMail({
      from: `"Ensure" <${process.env.MAIL_ID}>`,
      to: email,
      subject: "KYC Application Successfully Submitted",
      text: "KYC Application Successfully Submitted",
      html: applyKYCtmp.replace("{name}", name),
    });
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.log("Error sending email: ", error.message);
  }
};

export const kycStatusUpdate = async (email, name, subject, content) => {
  try {
    const info = await transpoter.sendMail({
      from: `"Ensure" <${process.env.MAIL_ID}>`,
      to: email,
      subject: subject,
      text: subject,
      html: applyKycStatusTemplate
        .replace("{name}", name)
        .replace(/{subject}/g, subject)
        .replace("{content}", content),
    });
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.log("Error sending email: ", error.message);
  }
};
