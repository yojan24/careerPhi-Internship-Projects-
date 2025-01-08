import jwt from "jsonwebtoken";
import User from "../model/user.js";
import asyncHandler from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const verifyToken = asyncHandler(async (req, res) => {
  res.json({ isValid: true });
});

export const authenticate = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new AppError("Not authorized", 401);
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findOne({ _id: decode.id });

    if (!req.user) {
      throw new AppError("Not authorized , user Not found", 401);
    }
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      throw new AppError("Not authorized, invalid token", 401);
    } else if (error.name === "TokenExpiredError") {
      throw new AppError("Not authorized, token has expired", 401);
    } else {
      throw new AppError("Not authorized, an error occurred", 401);
    }
  }
});

export const authorized = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json("Only admin can access");
  }
});
