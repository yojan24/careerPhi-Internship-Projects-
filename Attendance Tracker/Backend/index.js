import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import moment from "moment";
import cron from "node-cron";
import cors from "cors";

import conntectDB from "./config/DBconfig.js";
import userRoute from "./routes/user.js";

dotenv.config();
conntectDB();
const app = express();

app.use(
  cors({
    origin: process.env.origin,
    methods: ["GET", "POST", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

const port = process.env.PORT || 3000;
import User from "./model/user.js";
import Holiday from "./model/holiday.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

const morningCheck = async () => {
  try {
    const currDay = moment().day();

    const todayDate = moment().startOf("day");
    // const isHoliday = await Holiday.findOne({ date: todayDate });

    let status = "Absent";
    if (currDay === 0 || currDay === 6) {
      status = "Holiday";
    }

    const absentUsers = await User.find({ todayEntry: false });

    for (const user of absentUsers) {
      user.entries.unshift({
        entryTime: "10:00 AM",
        status,
      });
      user.todayEntry = true;
      user.checkIn = true;
      user.checkOut = true;

      await user.save({ validation: false });
    }
    console.log(`Checked attendance for ${absentUsers.length} users.`);
  } catch (error) {
    console.error("Error checking Morning attendance:", error);
  }
};

const nightCheck = async () => {
  try {
    const allUsers = await User.find({});

    for (const user of allUsers) {
      user.todayEntry = false;
      user.checkIn = false;
      user.checkOut = false;

      await user.save({ validation: false });
    }
  } catch (error) {
    console.error("Error checking Morning attendance:", error);
  }
};

cron.schedule(
  "1 10 * * *",
  () => {
    console.log("Attendance check at 10 AM....");
    morningCheck();
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata", // Set the timezone to IST
  }
);

cron.schedule(
  "0 0 * * *",
  () => {
    console.log("Reset Attendance at 12 AM....");
    nightCheck();
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata", // Set the timezone to IST
  }
);

app.use("/api/user", userRoute);

app.listen(port, () => {
  console.log("Listening on port :", port);
});
