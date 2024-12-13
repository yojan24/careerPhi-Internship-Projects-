import mongoose from "mongoose";

export const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("Invalid ID format", 400));
  }
  next();
};
