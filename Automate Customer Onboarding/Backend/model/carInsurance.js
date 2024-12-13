import mongoose from "mongoose";

const carInsuranceSchema = mongoose.Schema(
  {
    policyNo: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    carNumber: {
      type: String,
      unique: true,
      required: true,
    },
    carVariant: {
      type: String,
      required: true,
    },
    fuel: {
      type: String,
      required: true,
      enum: ["Petrol", "Diesel"],
    },
    registrationDate: {
      type: Date,
      required: true,
    },
    manufacturingDate: {
      type: Date,
      required: true,
    },
    planType: {
      type: String,
      required: true,
      enum: ["Third Party", "Comprehensive"],
    },
    idv: {
      type: Number,
      required: true,
      default: 171360,
    },
    ownerName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /\d{10}/.test(v); // Example validation for 10-digit phone number
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    email: {
      type: String,
      required: true,
    },
    pan: {
      type: String,
      required: true,
    },
    DOB: {
      type: Date,
      required: true,
    },
    nomineName: {
      type: String,
      required: true,
    },
    relation: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    engineNumber: {
      type: String,
      required: true,
    },
    chassisNumber: {
      type: String,
      required: true,
    },
    expire: {
      type: "Date",
    },
    payment: {
      type: Number,
      required: true,
    },
    paid: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carInsuranceSchema);

export default Car;
