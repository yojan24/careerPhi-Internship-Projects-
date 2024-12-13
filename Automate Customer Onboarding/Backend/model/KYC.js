import mongoose from "mongoose";
import User from "./user.js";

const kycSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    DOB: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    CountryOfResidence: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    photo: {
      type: Object,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    addressProofType: {
      type: String,
      required: true,
    },
    addProof: {
      type: Object,
      required: true,
    },
    identityProofType: {
      type: String,
      required: true,
    },
    identityProof: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      enum: ["Apply", "Processing", "Approved", "Rejected"],
      default: "Apply",
    },
  },
  {
    timestamps: true,
  }
);

const Kyc = mongoose.model("Kyc", kycSchema);

export default Kyc;
