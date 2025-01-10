import express from "express";
import {
  carQuoteController,
  healthQuoteController,
} from "../controller/freeQuoteController.js";

const router = express.Router();

router.route("/car").post(carQuoteController);
router.route("/health").post(healthQuoteController);

export default router;
