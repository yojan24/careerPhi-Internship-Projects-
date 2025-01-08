import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = mongoose.Schema({
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
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },
  passwordConfirm: {
    type: String,
    validate: {
      validator: function (it) {
        return it === this.password;
      },
      message: "Password and PasswordConfirm is not same",
    },
  },
  verificationCode: Number,
  codeExpire: Date,
  emailVerify: { type: Boolean, default: false },
  todayEntry: {
    type: Boolean,
    default: false,
  },
  checkIn: {
    type: Boolean,
    default: false,
  },
  checkOut: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  entries: [
    {
      date: {
        type: Date,
        default: Date.now, // Still storing date for the entries
      },
      entryTime: {
        type: String, // Store the time as a string
        required: true,
        match: [
          /^(0[1-9]|1[0-2]):([0-5][0-9]) (AM|PM)$/,
          "Please use the format hh:mm AM/PM",
        ], // Validation for 12-hour format with AM/PM
      },
      exitTime: {
        type: String, // Store the exit time as a string
        match: [
          /^(0[1-9]|1[0-2]):([0-5][0-9]) (AM|PM)$/,
          "Please use the format hh:mm AM/PM",
        ], // Validation for 12-hour format with AM/PM
      },
      status: {
        type: String,
        enum: ["Holiday", "Absent", "Present"],
      },
    },
  ],
});

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
