import mongoose from "mongoose";

const carQuoteSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  carNumber: {
    type: String,
    required: true,
  },
  carVariant: {
    type: String,
    required: true,
  },
  fuel: {
    type: String,
    required: true,
  },
  manufacturingDate: {
    type: Date,
    default: null,
  },
  plantype: {
    type: String,
    required: true,
  },
  years: {
    type: String,
    required: true,
  },
  idv: {
    type: String,
    required: true,
  },
  premiumAmount: {
    type: String,
    required: true,
  },
});

const CarQuoteEnquiry = mongoose.model("CarQuoteEnquiry", carQuoteSchema);

export default CarQuoteEnquiry;
