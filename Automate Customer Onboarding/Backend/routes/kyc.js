import express from "express";
import Kyc from "../model/KYC.js";
import { authenticate, authorized } from "../middleware/authMiddleware.js";
import { validateObjectId } from "../middleware/validateId.js";
import {
  applyKyc,
  getKyc,
  getKycByID,
  status,
  updateKyc,
  updateStatus,
} from "../controller/kycController.js";
const router = express.Router();

router.route("/").post(authenticate, applyKyc);

router.route("/update/:id").patch(authenticate, validateObjectId, updateKyc);

router.route("/").get(authenticate, getKyc);
router.route("/GetKycByAdmin/:id").get(authenticate, authorized, getKycByID);
router.route("/adminStatus").post(authenticate, authorized, status);

router
  .route("/updateByAdmin/:id")
  .patch(authenticate, authorized, updateStatus);

export default router;
