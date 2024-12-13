import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


export const transpoter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    ciphers: "SSLv3", // Ensures compatibility with Gmail's TLS settings
  },
});
