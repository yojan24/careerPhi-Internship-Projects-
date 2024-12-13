import express from "express";
import { authenticate, authorized } from "../middleware/authMiddleware.js";
import {
  AllInsurances,
  applyInsurance,
  getInsurances,
} from "../controller/carInsuranceController.js";
const router = express.Router();

router
  .route("/")
  .post(authenticate, applyInsurance)
  .get(authenticate, getInsurances);

router.route("/getAllInsurances").get(authenticate, authorized, AllInsurances);
export default router;
