import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";

import connectDB from "./config/dbConfig.js";
import userRoutes from "./routes/user.js";
import uploadRoute from "./routes/upload.js";
import kycRoute from "./routes/kyc.js";
import carRoute from "./routes/carInsurance.js";
import healthRoute from "./routes/healthInsurance.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

connectDB();
app.use(
  cors({
    origin: process.env.origin,
  })
);
// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/upload", uploadRoute);
app.use("/api/kyc", kycRoute);
app.use("/api/car", carRoute);
app.use("/api/health", healthRoute);

app.listen(PORT, (req, res) => {
  console.log("Lisening on port:", PORT);
});
