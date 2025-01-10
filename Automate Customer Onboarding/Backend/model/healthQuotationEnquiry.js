import mongoose from "mongoose";

const healthQuoteSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  disease: {
    type: [String],
  },
  idv: {
    type: String,
    required: true,
  },
  years: {
    type: String,
    retquired: true,
  },
  gst: {
    type: String,
    required: true,
  },
  premiumAmount: {
    type: String,
    required: true,
  },
});

const healthQuoteEnquiry = mongoose.model(
  "healthQuoteEnquiry",
  healthQuoteSchema
);

export default healthQuoteEnquiry;
