import dotenv from "dotenv";
dotenv.config();

export const BASE_URL = process.env.VITE_BASE_URL;
export const USER_URL = "/api/user";
export const UPLOAD_URL = "/api/upload";
export const KYC_URL = "/api/kyc";
export const CAR_URL = "/api/car";
export const HEALTH_URL = "/api/health";
