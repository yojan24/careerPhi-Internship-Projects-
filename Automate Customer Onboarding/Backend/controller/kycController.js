import { applyKycmail, kycStatusUpdate } from "../middleware/Email/email.js";
import Kyc from "../model/KYC.js";
import User from "../model/user.js";
import AppError from "../utils/appError.js";
import asyncHandler from "../utils/catchAsync.js";

export const applyKyc = asyncHandler(async (req, res) => {
  const {
    name,
    photo,
    DOB,
    gender,
    nationality,
    CountryOfResidence,
    email,
    phone,
    address,
    city,
    postalCode,
    addressProofType,
    addProof,
    identityProofType,
    identityProof,
    status,
  } = req.body;

  const requiredFields = [
    { field: "name", message: "Name is required" },
    { field: "photo", message: "Photo is required" },
    { field: "DOB", message: "Date of Birth is required" },
    { field: "gender", message: "Gender is required" },
    { field: "nationality", message: "Nationality is required" },
    { field: "email", message: "Email is required" },
    { field: "phone", message: "Phone number is required" },
    { field: "address", message: "Address is required" },
    { field: "city", message: "City is required" },
    { field: "postalCode", message: "Postal code is required" },
    { field: "addressProofType", message: "Address proof type is required" },
    { field: "addProof", message: "Address proof is required" },
    { field: "identityProofType", message: "Identity proof type is required" },
    { field: "identityProof", message: "Identity proof is required" },
    { field: "status", message: "Status is required" },
  ];

  for (const { field, message } of requiredFields) {
    if (!req.body[field]) {
      throw new AppError(message, 400); // Throw custom error if field is missing
    }
  }

  const kyc = new Kyc({
    user: req.user._id,
    name,
    photo,
    DOB,
    gender,
    nationality,
    email,
    phone,
    address,
    city,
    postalCode,
    addressProofType,
    CountryOfResidence,
    addProof,
    identityProofType,
    identityProof,
    status,
  });

  await kyc.save();

  const person = await User.findById(req.user._id);

  if (person && person.email) {
    await applyKycmail(person.email, person.name);
  }
  // console.log("send Email");
  res.status(201).json({ kyc });
});

export const updateKyc = asyncHandler(async (req, res) => {
  const {
    name,
    photo,
    DOB,
    gender,
    nationality,
    CountryOfResidence,
    email,
    phone,
    address,
    city,
    postalCode,
    addressProofType,
    addProof,
    identityProofType,
    identityProof,
    status,
  } = req.body;

  const kyc = await Kyc.findById(req.params.id);

  if (!kyc) {
    throw new AppError("KYC not found", 404);
  }

  // Only update fields that are provided in the request body (PATCH request)
  if (name) kyc.name = name;
  if (photo) {
    kyc.photo = photo;
    console.log("photo");
  }
  if (DOB) kyc.DOB = DOB;
  if (gender) kyc.gender = gender;
  if (nationality) kyc.nationality = nationality;
  if (CountryOfResidence) kyc.CountryOfResidence = CountryOfResidence;
  if (email) kyc.email = email;
  if (phone) kyc.phone = phone;
  if (address) kyc.address = address;
  if (city) kyc.city = city;
  if (postalCode) kyc.postalCode = postalCode;
  if (addressProofType) kyc.addressProofType = addressProofType;
  if (addProof) {
    kyc.addProof = addProof;
    console.log("addProof");
  }
  if (identityProofType) kyc.identityProofType = identityProofType;
  if (identityProof) kyc.identityProof = identityProof;
  if (status) kyc.status = status;

  // Save the updated KYC document
  await kyc.save();

  // Respond with the updated KYC document
  res.status(200).json({ kyc });
});

export const updateStatus = asyncHandler(async (req, res) => {
  const { status, mail } = req.body;

  const kyc = await Kyc.findById(req.params.id);

  if (!kyc) {
    throw new AppError("Application not found", 404);
  }

  kyc.status = status;

  const user = await User.findById(kyc.user);
  await kyc.save();
  if (mail) {
    kycStatusUpdate(user.email, user.name, mail.subject, mail.content);
  }

  res.status(200).json(kyc);
});

export const getKyc = asyncHandler(async (req, res) => {
  const kyc = await Kyc.findOne({ user: req.user._id });

  if (!kyc) {
    throw new AppError("Not found", 404);
  }

  res.status(200).json(kyc);
});

export const status = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const pendingApplications = await Kyc.find(
    { status: status },
    { _id: 1, name: 1, createdAt: -1 }
  );
  res.status(201).json(pendingApplications);
});

export const getKycByID = asyncHandler(async (req, res) => {
  const kyc = await Kyc.findById(req.params.id);

  if (!kyc) {
    throw new AppError("Application not found", 404);
  }

  res.status(200).json(kyc);
});
