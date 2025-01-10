import asyncHandler from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { freeCarQuote, freeHealthQuote } from "../middleware/Email/email.js";
import CarQuoteEnquiry from "../model/carQuotationEnquiry.js";
import healthQuoteEnquiry from "../model/healthQuotationEnquiry.js";

export const carQuoteController = asyncHandler(async (req, res) => {
  const {
    carNumber,
    carVariant,
    email,
    fuel,
    gst,
    idv,
    manufacturingDate,
    name,
    plantype,
    premiumAmount,
    totalAmount,
    years,
  } = req.body;

  const requiredFields = [
    { field: "carNumber", message: "Car number is required" },
    { field: "carVariant", message: "Car variant is required" },
    { field: "email", message: "Email is required" },
    { field: "fuel", message: "Fuel type is required" },
    { field: "idv", message: "IDV is required" },
    { field: "name", message: "Name is required" },
    { field: "plantype", message: "Plan type is required" },
    { field: "premiumAmount", message: "Premium amount is required" },
    { field: "totalAmount", message: "Total amount is required" },
    { field: "years", message: "Number of years is required" },
  ];

  // Check if all required fields are provided
  for (const { field, message } of requiredFields) {
    if (!req.body[field]) {
      throw new AppError(message, 400);
    }
  }
  const newRecord = await CarQuoteEnquiry.create({
    carNumber,
    carVariant,
    email,
    fuel,
    idv,
    manufacturingDate,
    name,
    plantype,
    premiumAmount,
    years,
  });

  await newRecord.save();

  if (newRecord) {
    await freeCarQuote(
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
    );
  }
  res.status(200).json();
});

export const healthQuoteController = asyncHandler(async (req, res) => {
  const { disease, email, gst, idv, name, premiumAmount, totalAmount, years } =
    req.body;

  const requiredFields = [
    { field: "email", message: "Email is required" },
    { field: "name", message: "Name is required" },
    { field: "disease", message: "Please Select No illness" },
    { field: "idv", message: "IDV is required" },
    { field: "premiumAmount", message: "Premium amount is required" },
    { field: "totalAmount", message: "Total amount is required" },
    { field: "years", message: "Number of years is required" },
  ];

  for (const { field, message } of requiredFields) {
    if (!req.body[field]) {
      throw new AppError(message, 400);
    }
  }
  const newRecord = await healthQuoteEnquiry.create({
    disease,
    email,
    gst,
    idv,
    name,
    premiumAmount,
    totalAmount,
    years,
  });

  await newRecord.save();

  console.log(
    name,
    email,
    idv,
    premiumAmount,
    gst,
    totalAmount,
    years,
    disease
  );
  if (newRecord) {
    await freeHealthQuote(
      name,
      email,
      idv,
      premiumAmount,
      gst,
      totalAmount,
      years,
      disease
    );
  }
  res.status(200).json();
});
