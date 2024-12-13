import { applyhealthmail } from "../middleware/Email/email.js";
import Health from "../model/healthInsurance.js";
import User from "../model/user.js";
import AppError from "../utils/appError.js";
import asyncHandler from "../utils/catchAsync.js";

export const apply = asyncHandler(async (req, res) => {
  const {
    insurerName,
    insurer,
    years,
    city,
    disease,
    idv,
    gender,
    age,
    payment,
    paid,
  } = req.body;

  const randomDigits = Math.floor(Math.random() * 90000000) + 10000000;
  const policyNo = "POL" + randomDigits;

  const requiredFields = [
    { field: "insurerName", message: "Insurer name is required" },
    { field: "insurer", message: "Insurer company is required" },
    { field: "years", message: "Years of coverage are required" },
    { field: "city", message: "City is required" },
    { field: "disease", message: "Disease details are required" },
    { field: "idv", message: "Insured Declared Value (IDV) is required" },
    { field: "gender", message: "Gender is required" },
    { field: "age", message: "Age is required" },
    { field: "payment", message: "Payment amount is required" },
  ];

  for (const { field, message } of requiredFields) {
    if (!req.body[field]) {
      throw new AppError(message, 400);
    }
  }

  const healthInsurance = new Health({
    policyNo,
    user: req.user._id,
    insurerName,
    insurer,
    years,
    city,
    disease,
    idv,
    gender,
    age,
    payment,
    paid,
  });

  await healthInsurance.save();

  const Us = await User.findById(req.user._id);

  if (Us && Us.email) {
    applyhealthmail(Us.email, Us.name); // Send email after successful application
  }
  return res.status(201).json({
    healthInsurance,
  });
});

export const getHealthInsurances = asyncHandler(async (req, res) => {
  const healthInsurances = await Health.find({ user: req.user._id });

  if (!healthInsurances) {
    throw new AppError("No health insurance applications found", 404);
  }

  res.status(200).json(healthInsurances);
});

export const AllInsurances = asyncHandler(async (req, res) => {
  const insurances = await Health.find({});
  res.status(200).json(insurances);
});
