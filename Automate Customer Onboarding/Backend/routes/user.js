import express from "express";
import {
  addNotification,
  deleteNotification,
  getAllNotification,
  getAllUsers,
  getUserByID,
  login,
  logOut,
  register,
  resendOTP,
  updateKycStatus,
  updateUser,
  verifyOTP,
} from "../controller/userController.js";
import { authenticate, authorized } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(register).get(authenticate, authorized, getAllUsers);
router.route("/getuser/:id").get(authenticate, getUserByID);
router.route("/update").patch(authenticate, updateUser);
router
  .route("/updateKycStatus/:id")
  .post(authenticate, authorized, updateKycStatus);
router.route("/notifications").get(authenticate, getAllNotification);
router.delete("/deleteNotification/:id", authenticate, deleteNotification);
router.route("/addNotification").post(authenticate, addNotification);
router.route("/login").post(login);
router.route("/logOut").post(logOut);
router.post("/verifyOTP", verifyOTP);
router.post("/resendOTP", resendOTP);

export default router;
