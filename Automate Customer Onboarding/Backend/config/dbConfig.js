import mongoose from "mongoose";

const connectDB = async () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then((con) => console.log("Database Connected Successfully"))
    .catch((err) => console.log(err.message));
};

export default connectDB;
