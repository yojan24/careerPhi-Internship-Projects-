import { transpoter } from "./config.js";
import {
  OTPTemp,
  welcomeTmp,
  applyCar,
  applyhealth,
  applyKYCtmp,
  applyKycStatusTemplate,
  freeCarQuote_Template,
  freeHealthQuote_template,
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
    // console.log("Email sent: " + info.response);
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
    // console.log("Email sent: " + info.response);
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
    // console.log("Email sent: " + info.response);
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
  } catch (error) {
    console.log("Error sending email: ", error.message);
  }
};

export const freeCarQuote = async (
  name,
  email,
  carNumber,
  carVariant,
  fuel,
  plantype,
  years,
  gst,
  idv,
  premiumAmount,
  totalAmount
) => {
  try {
    await transpoter.sendMail({
      from: `"Ensure" <${process.env.MAIL_ID}>`,
      to: email,
      subject: " Your Car Quotation",
      text: " Your Car Quotation",
      html: freeCarQuote_Template
        .replaceAll("{name}", name)
        .replace("{email}", email)
        .replace("{carNumber}", carNumber)
        .replace("{carVariant}", carVariant)
        .replace("{fuel}", fuel)
        .replaceAll("{plan}", plantype)
        .replaceAll("{idvValue}", idv)
        .replaceAll("{premiumAmount}", premiumAmount)
        .replace("{years}", years)
        .replace("{gst}", gst)
        .replace("{totalAmount}", totalAmount),
    });
  } catch (error) {
    console.log("Error sending email: ", error.message);
  }
};

export const freeHealthQuote = async (
  name,
  email,
  idv,
  premiumAmount,
  gst,
  totalAmount,
  years,
  disease = "No illnesses"
) => {
  try {
    await transpoter.sendMail({
      from: `"Ensure" <${process.env.MAIL_ID}>`,
      to: email,
      subject: " Your Health Quotation",
      text: " Your Health Quotation",
      html: freeHealthQuote_template
        .replaceAll("{name}", name)
        .replace("{email}", email)
        .replace("{disease}", disease)
        .replaceAll("{idv}", idv)
        .replaceAll("{Premium}", premiumAmount)
        .replace("{years}", years)
        .replace("{gst}", gst)
        .replace("{totalAmount}", totalAmount),
    });
  } catch (error) {
    console.log("Error sending email: ", error.message);
  }
};
