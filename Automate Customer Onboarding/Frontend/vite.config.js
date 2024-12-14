import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import dotenv from "dotenv";
// dotenv.config();

// console.log(process.env.VITE_BASE_URL);
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: "",
  },
});
