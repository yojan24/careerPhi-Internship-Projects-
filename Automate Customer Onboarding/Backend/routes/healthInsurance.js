import express from "express";
import { authenticate, authorized } from "../middleware/authMiddleware.js";
import {
  AllInsurances,
  apply,
  getHealthInsurances,
} from "../controller/healthInsuranceController.js";
const router = express.Router();

router
  .route("/")
  .post(authenticate, apply)
  .get(authenticate, getHealthInsurances);

router.route("/getAllInsurances").get(authenticate, authorized, AllInsurances);

export default router;
