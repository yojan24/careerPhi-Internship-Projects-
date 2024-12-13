import mongoose from "mongoose";

const healthSchema = mongoose.Schema(
  {
    policyNo: {
      type: String,
      unique: true,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    insurerName: {
      type: "String",
      required: true,
    },
    insurer: {
      type: "String",
      required: true,
    },
    years: {
      type: "Number",
      required: true,
    },
    city: {
      type: "String",
      required: true,
    },
    disease: {
      type: [String],
    },
    idv: {
      type: "Number",
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    age: {
      type: "Number",
      required: true,
    },
    payment: {
      type: Number,
    },
    expire: {
      type: "Date",
    },
    paid: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Health = mongoose.model("Health", healthSchema);

export default Health;
