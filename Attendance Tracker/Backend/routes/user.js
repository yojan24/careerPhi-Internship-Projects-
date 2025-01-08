import express from "express";
import {
  authenticate,
  authorized,
  verifyToken,
} from "../middleware/authMiddleware.js";
import {
  allUsers,
  checkIn,
  checkOut,
  currUser,
  deleteUser,
  getUserByID,
  login,
  logOut,
  register,
  resendOtp,
  veriyOtp,
} from "../controller/userController.js";
const router = express.Router();

router.route("/").post(register).get(authenticate, currUser);
router.route("/token-verification").get(authenticate, verifyToken);
router.route("/login").post(login);
router.route("/logout").post(logOut);
router.route("/getAllUsers").get(authenticate, authorized, allUsers);
router.route("/getUser/:id").get(authenticate, authorized, getUserByID);
router.route("/check-in").patch(authenticate, checkIn);
router.route("/check-out").patch(authenticate, checkOut);
router.route("/delete/:id").delete(authenticate, authorized, deleteUser);
router.route("/verifyOTP").post(veriyOtp);
router.route("/resendOTP").post(resendOtp);

export default router;
