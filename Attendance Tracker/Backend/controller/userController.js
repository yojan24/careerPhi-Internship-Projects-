import { sendMail, welcomeMail } from "../middleware/email/email.js";
import User from "../model/user.js";
import AppError from "../utils/appError.js";
import mongoose from "mongoose";
import asyncHandler from "../utils/catchAsync.js";
import createToken from "../utils/createToken.js";
import { format } from "date-fns";
import { TZDate } from "@date-fns/tz";
import { DateTime } from "luxon";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;
  if (!name || !email || !password || !passwordConfirm) {
    throw new AppError("All details must be filled!", 400);
  }

  if (await User.findOne({ email })) {
    throw new AppError("User already exist", 400);
  }
  const employeeId =
    "EMP" + Math.floor(Math.random() * 50000 + 10000).toString();
  const verificationcode = Math.floor(
    Math.random() * 900000 + 100000
  ).toString();
  const expirationTime = new Date();
  expirationTime.setMinutes(expirationTime.getMinutes() + 10);

  const newUser = await User.create({
    name,
    email,
    password,
    employeeId,
    passwordConfirm,
    verificationCode: verificationcode,
    codeExpire: expirationTime,
  });
  await newUser.save();
  await sendMail(newUser.email, newUser.verificationCode);
  res.status(201).json({
    message: "Successfully created",
  });
});

export const login = asyncHandler(async (req, res) => {
  const { employeeId, password } = req.body;
  // console.log(email, password);
  if (!employeeId || !password) {
    throw new AppError("All field must be provided", 400);
  }

  const user = await User.findOne({ employeeId }).select("+password");

  if (
    !user ||
    !password ||
    !(await user.validPassword(password, user.password))
  ) {
    throw new AppError("Invalid credentials !!", 401);
  }

  if (!user.emailVerify) {
    throw new AppError("Need to verify email to proceed", 400);
  }
  user.password = undefined;
  createToken(res, user._id);

  return res.status(200).json(user);
});

export const veriyOtp = asyncHandler(async (req, res) => {
  const { code } = req.body;

  const user = await User.findOne({
    verificationCode: code,
    verificationCode: { $exists: true },
  });

  console.log(user);
  if (!user) {
    throw new AppError("Invalid OTP", 400);
  }

  if (new Date() > new Date(user.codeExpire)) {
    throw new AppError("OTP has expired. Please request a new OTP", 400);
  }
  user.emailVerify = true;
  user.verificationCode = undefined;
  user.codeExpire = undefined;
  await user.save();

  createToken(res, user._id);
  welcomeMail(user.email, user.name, user.employeeId);
  res.status(201).json(user);
});

export const resendOtp = asyncHandler(async (req, res) => {
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

  user.verificationCode = newVerificationCode;
  user.codeExpire = expirationTime;
  await user.save();

  await sendMail(user.email, user.verificationCode);

  res.status(200).json({
    message: "New OTP has been sent to your email.",
  });
});

export const allUsers = asyncHandler(async (req, res) => {
  const users = await User.find(
    {},
    { email: 1, _id: 1, name: 1, employeeId: 1, isAdmin: 1 }
  );
  res.status(200).json(users);
});

export const logOut = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.status(204).send();
});

export const checkIn = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.todayEntry) {
    return next(new AppError("User has already checked in today", 400));
  }

  // Get current UTC time and convert it to IST using TZDate
  const currentUtcTime = new Date();
  const currentIstTime = new TZDate(currentUtcTime, "Asia/Kolkata"); // Convert to IST

  // Format date (yyyy-MM-dd) for IST
  const formattedDateString = format(currentIstTime, "yyyy-MM-dd");

  // Format time (hh:mm a -> 12-hour clock with AM/PM)
  const formattedEntryTimeString = format(currentIstTime, "hh:mm a");

  // Proceed with updating user data
  user.todayEntry = true;
  user.checkIn = true;

  // Initialize user.entries if it doesn't exist
  if (!user.entries) {
    user.entries = [];
  }

  // Add the new check-in entry with the correct date and time
  user.entries.unshift({
    date: formattedDateString, // Correct date in IST
    entryTime: formattedEntryTimeString, // Entry time in IST
    status: "Present",
  });

  // Save the updated user data
  await user.save({ validation: false });

  res
    .status(201)
    .json({ message: `Checked in at ${formattedEntryTimeString}` });
});

// export const checkOut = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);

//   if (!user) {
//     throw new AppError("User not found", 404);
//   }

//   // Check if the user has already checked out today
//   if (user.checkOut) {
//     throw new AppError("User has already checked out today", 400);
//   }

//   // Get today's date in yyyy-MM-dd format
//   const today = format(new Date(), "yyyy-MM-dd");
//   // console.log(today);

//   // Find the entry for today's check-in
//   const entry = user.entries.find(
//     (entry) => format(new Date(entry.date), "yyyy-MM-dd") === today
//   );

//   if (!entry) {
//     throw new AppError("No check-in record found for today", 400);
//   }

//   // Convert the check-in time to IST using TZDate (Asia/Kolkata)
//   const checkInTime = new TZDate(entry.date, "Asia/Kolkata");

//   // Calculate 3 hours later in IST
//   const threeHoursLater = new TZDate(
//     checkInTime.getTime() + 3 * 60 * 60 * 1000, // Adding 3 hours in milliseconds
//     "Asia/Kolkata"
//   );
//   console.log(threeHoursLater);

//   // Get the current UTC time and convert to IST using TZDate
//   const currentUtcTime = new Date();
//   const currentIstTime = new TZDate(currentUtcTime, "Asia/Kolkata");

//   console.log(threeHoursLater, currentIstTime);

//   // Check if it's still before 3 hours after check-in time
//   if (threeHoursLater > currentIstTime) {
//     const formattedThreeHoursLater = format(threeHoursLater, "hh:mm a", {
//       timeZone: "Asia/Kolkata",
//     });
//     throw new AppError(
//       `Cannot checkout until ${formattedThreeHoursLater}`,
//       400
//     );
//   }

//   // Format the current exit time in hh:mm a format (12-hour clock with AM/PM)
//   const formattedExitTimeString = format(currentIstTime, "hh:mm a", {
//     timeZone: "Asia/Kolkata",
//   });

//   // Update the entry with the exit time and mark the user as checked out
//   entry.exitTime = formattedExitTimeString;
//   user.checkOut = true;

//   // Save the updated user data
//   await user.save();

//   // Send success response
//   res.status(201).json({
//     message: `Checked out at ${formattedExitTimeString}`,
//   });
// });

export const checkOut = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  // Check if the user has already checked out today
  if (user.checkOut) {
    throw new AppError("User has already checked out today", 400);
  }

  // Get today's date in yyyy-MM-dd format
  const today = DateTime.now().toISODate(); // Using Luxon to get today's date in ISO format (yyyy-MM-dd)

  // Find the entry for today's check-in
  const entry = user.entries.find(
    (entry) => DateTime.fromJSDate(entry.date).toISODate() === today // Compare with today's date
  );

  if (!entry) {
    throw new AppError("No check-in record found for today", 400);
  }

  // Convert the current time to a Luxon DateTime object in Asia/Kolkata time zone
  const currentIstTime = DateTime.now().setZone("Asia/Kolkata");

  // Format the current exit time in hh:mm a format (12-hour clock with AM/PM)
  const formattedExitTimeString = currentIstTime.toFormat("hh:mm a");

  // Update the entry with the exit time and mark the user as checked out
  entry.exitTime = formattedExitTimeString;
  user.checkOut = true;

  // Save the updated user data
  await user.save();

  // Send success response
  res.status(201).json({
    message: `Checked out at ${formattedExitTimeString}`,
  });
});

export const getUserByID = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid user ID", 400);
  }

  const user = await User.findById(id);

  if (!user) {
    throw new AppError("User does not exist", 404);
  }

  res.status(200).json(user);
});

export const currUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.status(200).json(user);
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params; // Extract the user ID from the request params

  const user = await User.findById(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  await User.deleteOne({ _id: user._id });

  // Send a success response
  res.status(200).json({
    message: "User deleted successfully",
  });
});
