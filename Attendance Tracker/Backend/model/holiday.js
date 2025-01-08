import mongoose from "mongoose";

const holidaySchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
});

const Holiday = mongoose.model("Holiday", holidaySchema);

export default Holiday;
