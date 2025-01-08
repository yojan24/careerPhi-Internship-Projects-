const express = require("express");
const mongoose = require("mongoose");
const cron = require("node-cron");
const moment = require("moment");

// Create an express application
const app = express();
app.use(express.json()); // To parse JSON requests

// Connect to MongoDB (use your own MongoDB URI)
mongoose.connect("mongodb://localhost/attendance", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const attendanceSchema = new mongoose.Schema({
  username: String,
  date: { type: Date, default: Date.now },
  status: String,
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

const checkAttendance = async () => {
  try {
    const today = moment().startOf("day"); // Get today's date at 00:00
    const tomorrow = moment(today).add(1, "day"); // Get tomorrow's date at 00:00

    const currentDay = moment().day(); // Get the current day (0 = Sunday, 6 = Saturday)

    let status = "present"; // Default status for users who check in on weekdays
    if (currentDay === 0 || currentDay === 6) {
      // Check if today is Sunday (0) or Saturday (6)
      status = "holiday"; // Mark as holiday
    }

    // Get all users who have not marked attendance yet today
    const absentUsers = await Attendance.find({
      date: { $gte: today.toDate(), $lt: tomorrow.toDate() },
      status: { $ne: "present" }, // Exclude those who are marked as present
    });

    // Mark as holiday for users who are absent on Saturday or Sunday
    absentUsers.forEach(async (user) => {
      if (status === "holiday") {
        user.status = "holiday"; // Mark as holiday if it's a weekend
      } else if (user.status !== "present") {
        user.status = "absent"; // Otherwise, mark as absent if they haven't checked in by 10 AM
      }
      await user.save();
      console.log(`User ${user.username} marked as ${user.status}.`);
    });
  } catch (err) {
    console.error("Error checking attendance:", err);
  }
};

// Set up a cron job to run every day at 10 AM
cron.schedule("0 10 * * *", () => {
  console.log("Running attendance check at 10 AM...");
  checkAttendance();
});

// Route to log attendance (for manual check-ins)
app.post("/log-attendance", async (req, res) => {
  const { username } = req.body; // Assume username is sent in the request body
  const currentTime = moment();
  const currentHour = currentTime.hour();
  let status = "present";
  // If it's before 10 AM, mark the user as absent
  if (currentHour < 10) {
    status = "absent";
  } else if (currentTime.day() === 0 || currentTime.day() === 6) {
    // Check if it's Saturday or Sunday
    status = "holiday"; // If it's weekend, mark as holiday
  }
  const attendanceRecord = new Attendance({
    username: username,
    status: status,
  });

  try {
    await attendanceRecord.save();
    res.status(200).json({
      message: `Attendance recorded as ${status} for ${username}.`,
      status: status,
    });
  } catch (err) {
    res.status(500).json({ message: "Error recording attendance", error: err });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Attendance system is running on http://localhost:${PORT}`);
});
