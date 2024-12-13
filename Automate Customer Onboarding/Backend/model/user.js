import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
const myObjectId = new ObjectId();

const photoSchema = new mongoose.Schema({
  public_id: { type: String },
  src: {
    type: String,
  },
  original_name: { type: String },
});
const notificationschema = mongoose.Schema(
  {
    subject: { type: String },
    content: { type: String },
  },
  { timestamps: true }
);

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    passwordConfirm: {
      type: String,
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "password are not same!!!",
      },
    },
    photo: {
      type: photoSchema,

      default: null,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isEmailVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    phone: {
      type: Number,
      default: null,
    },
    isPhoneVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    verifyCode: Number,
    verifyCodeExpiration: Date,
    isKYC: {
      type: Boolean,
      required: true,
      default: false,
    },
    kycApplied: {
      type: Boolean,
      required: true,
      default: false,
    },
    panNumber: {
      type: Number,
    },
    notifications: [notificationschema],
  },

  {
    timeStamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.validPassword = async function (candidatePass, hashPass) {
  return await bcrypt.compare(candidatePass, hashPass);
};

const User = mongoose.model("User", userSchema);

export default User;
