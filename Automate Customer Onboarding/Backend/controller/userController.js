import { application } from "express";
import { sendMail, welcomeMail } from "../middleware/Email/email.js";
import User from "../model/user.js";
import AppError from "../utils/appError.js";
import asyncHandler from "../utils/catchAsync.js";
import createToken from "../utils/createToken.js";

//register User
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;

  if (!name || !email || !password || !passwordConfirm) {
    throw new AppError("all filed must be field", 400);
  }

  if (await User.findOne({ email })) {
    throw new AppError("User already Exist", 400);
  }
  const verificationcode = Math.floor(
    Math.random() * 900000 + 100000
  ).toString();
  const expirationTime = new Date();
  expirationTime.setMinutes(expirationTime.getMinutes() + 10);

  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    verifyCode: verificationcode,
    verifyCodeExpiration: expirationTime,
  });
  await newUser.save();

  createToken(res, newUser._id);
  await sendMail(newUser.email, newUser.verifyCode);

  res.status(200).json({
    name: newUser.name,
    email: newUser.email,
    isAdmin: newUser.isAdmin,
    isKYC: newUser.isKYC,
    phone: newUser.phone,
    isEmailVerified: newUser.isEmailVerified,
    kycApplied: newUser.kycApplied,
    photo: newUser.photo,
    message: "user register successfully",
  });
});

//login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
  if (!email || !password) {
    throw new AppError("All field must be provided", 400);
  }

  const user = await User.findOne({ email }).select("+password");
  // console.log(user);
  if (
    !user ||
    !password ||
    !(await user.validPassword(password, user.password))
  ) {
    throw new AppError("Invalid credentials !!", 401);
  }

  createToken(res, user._id);

  return res.status(200).json({
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    isKYC: user.isKYC,
    isEmailVerified: user.isEmailVerified,
    kycApplied: user.kycApplied,
    photo: user.photo,
    phone: user.phone,
    notifications: user.notifications,
    message: "Login successfully",
  });
});

//logout
export const logOut = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.status(204).send();
});

export const getUserByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.param.id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.status(200).json(user);
});

export const getAllNotification = asyncHandler(async (req, res) => {
  const user = await User.aggregate([
    { $match: { _id: req.user._id } },
    { $unwind: "$notifications" },
    { $sort: { "notifications.createdAt": 1 } },
    { $project: { notifications: 1 } },
  ]);

  res.json(user); // Send the notifications
});

export const deleteNotification = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const notificationIndex = user.notifications.findIndex((notification) => {
    console.log("Notification ID:", notification._id); // Log the notification _id
    return notification._id.toString() === String(id); // Ensure both sides are strings
  });

  if (notificationIndex === -1) {
    throw new AppError("Notification not found", 404);
  }

  user.notifications.splice(notificationIndex, 1);

  await user.save();

  res.status(200).json({
    status: "success",
    message: "Notification deleted successfully",
  });
});

export const addNotification = asyncHandler(async (req, res) => {
  const { email, notification } = req.body;
  console.log(email, notification);
  // Check if notification content is provided
  if (!notification || !notification.subject || !notification.content) {
    throw new AppError("Notification subject and content are required", 400);
  }

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("User not found", 404);
  }

  // Push the notification into the user's notifications array
  user.notifications.push({
    subject: notification.subject,
    content: notification.content,
  });

  // Save the user document with the new notification
  await user.save();

  // Send a success response with the updated user data (or just the notification if you prefer)
  res.status(200).json({
    message: "add successfully",
  });
});

export const updateUser = asyncHandler(async (req, res) => {
  const { name, email, photo, phone, password, passwordConfirm, kycApplied } =
    req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (name) user.name = name;
  if (email) {
    user.email = email;
    isEmailVerified = false;
  }
  if (phone) user.phone = phone;
  if (photo) {
    user.photo = {
      public_id: photo["public_id"], // Ensure you are setting each field of the photo object
      src: photo["src"],
      original_name: photo["original_name"],
    };
  }
  if (kycApplied) user.kycApplied = kycApplied;
  if (password) {
    user.password = password;
    user.passwordConfirm = passwordConfirm;
  }
  const updatedUser = await user.save({ validation: false });

  return res.status(201).json(updatedUser);
});

export const updateKycStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const user = await User.findById(req.params.id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  user.isKYC = status;

  await user.save();
  res.status(201).json({ message: "updated status" });
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await User.find({});
  res.status(200).json(allUsers);
});

//email verification
export const verifyOTP = asyncHandler(async (req, res) => {
  const { code } = req.body;

  const user = await User.findOne({
    verifyCode: code,
    verifyCode: { $exists: true },
  });

  console.log(user);
  if (!user) {
    throw new AppError("Invalid OTP", 400);
  }

  if (new Date() > new Date(user.verifyCodeExpiration)) {
    throw new AppError("OTP has expired. Please request a new OTP", 400);
  }
  user.isEmailVerified = true;
  user.verifyCode = undefined;
  user.verifyCodeExpiration = undefined;
  await user.save();

  welcomeMail(user.email, user.name);
  res.status(201).json({
    message: "Email verification successful",
  });
});

//resend OTP
export const resendOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  // Generate a new OTP and set a new expiration time
  const newVerificationCode = Math.floor(
    Math.random() * 900000 + 100000
  ).toString();
  const expirationTime = new Date();
  expirationTime.setMinutes(expirationTime.getMinutes() + 10); // 10 minutes expiration

  user.verifyCode = newVerificationCode;
  user.verifyCodeExpiration = expirationTime;
  await user.save();

  await sendMail(user.email, user.verifyCode);

  res.status(200).json({
    message: "New OTP has been sent to your email.",
  });
});
