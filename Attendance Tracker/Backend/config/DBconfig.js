import mongoose from "mongoose";

const conntectDB = async () => {
  mongoose
    .connect(process.env.DATABASE)
    .then((con) => console.log("Database connected"))
    .catch((error) => console.log(error.message));
};
export default conntectDB;
