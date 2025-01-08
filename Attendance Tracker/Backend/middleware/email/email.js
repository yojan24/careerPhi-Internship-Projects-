import { transpoter } from "./config.js";
import { OTPTemp, welcomeTmp } from "./templates.js";
import dotenv from "dotenv";
dotenv.config();

export const sendMail = async (email, verificationCode) => {
  try {
    const info = await transpoter.sendMail({
      from: `"Attendance Tracker" <${process.env.MAIL_ID}>`,
      to: email,
      subject: "Verify your email",
      text: "Verify your email",
      html: OTPTemp.replace("{verificationCode}", verificationCode),
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const welcomeMail = async (email, name, employeeId) => {
  try {
    const info = await transpoter.sendMail({
      from: `"Attendance Tracker" <${process.env.MAIL_ID}>`,
      to: email,
      subject: "Welcome Email",
      text: "Welcome email",
      html: welcomeTmp
        .replace("{name}", name)
        .replace("{employeeId}", employeeId),
    });
  } catch (error) {
    console.log(error.message);
  }
};
