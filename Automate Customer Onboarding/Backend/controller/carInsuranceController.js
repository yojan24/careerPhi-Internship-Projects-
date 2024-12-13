import { applycarmail } from "../middleware/Email/email.js";
import Car from "../model/carInsurance.js";
import User from "../model/user.js";
import AppError from "../utils/appError.js";
import asyncHandler from "../utils/catchAsync.js";

export const applyInsurance = asyncHandler(async (req, res) => {
  const {
    carNumber,
    carVariant,
    fuel,
    registrationDate,
    manufacturingDate,
    planType,
    idv,
    ownerName,
    gender,
    phone,
    email,
    pan,
    DOB,
    nomineName,
    relation,
    age,
    expire,
    engineNumber,
    chassisNumber,
    payment,
    paid,
  } = req.body;
  const requiredFields = [
    { field: "carNumber", message: "Car number is required" },
    { field: "carVariant", message: "Car variant is required" },
    { field: "fuel", message: "Fuel type is required" },
    { field: "registrationDate", message: "Registration date is required" },
    { field: "manufacturingDate", message: "Manufacturing date is required" },
    { field: "planType", message: "Policy type is required" },
    { field: "idv", message: "Insured Declared Value (IDV) is required" },
    { field: "ownerName", message: "Owner name is required" },
    { field: "gender", message: "Gender is required" },
    { field: "phone", message: "Phone number is required" },
    { field: "email", message: "Email is required" },
    { field: "pan", message: "PAN number is required" },
    { field: "DOB", message: "Date of Birth is required" },
    { field: "nomineName", message: "Nominee name is required" },
    { field: "relation", message: "Relation with nominee is required" },
    { field: "age", message: "Age is required" },
    { field: "engineNumber", message: "Engine number is required" },
    { field: "chassisNumber", message: "Chassis number is required" },
    { field: "payment", message: "Payment is required" },
  ];

  const randomDigits = Math.floor(Math.random() * 90000000) + 10000000;
  const policyNo = "POL" + randomDigits;

  for (const { field, message } of requiredFields) {
    if (!req.body[field]) {
      throw new AppError(message, 400); // Throw custom error if field is missing
    }
  }
  const carInsurance = new Car({
    policyNo,
    user: req.user._id,
    carNumber,
    carVariant,
    fuel,
    registrationDate,
    manufacturingDate,
    planType,
    idv,
    ownerName,
    gender,
    phone,
    email,
    pan,
    DOB,
    nomineName,
    relation,
    age,
    expire,
    engineNumber,
    chassisNumber,
    payment,
    paid,
  });

  await carInsurance.save();
  const Us = await User.findById(req.user._id);

  if (Us && Us.email) {
    applycarmail(Us.email, Us.name); // Send email after successful application
  }
  // Send response
  return res.status(201).json({
    carInsurance,
  });
});

export const getInsurances = asyncHandler(async (req, res) => {
  const insurances = await Car.find({ user: req.user._id });

  if (!insurances) {
    throw new AppError("No applications Found", 404);
  }

  res.status(201).json(insurances);
});

export const AllInsurances = asyncHandler(async (req, res) => {
  const insurances = await Car.find({});
  res.status(200).json(insurances);
});
