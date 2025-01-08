import Holiday from "../model/holiday.js";
import asyncHandler from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const addingHoliday = asyncHandler(async (req, res) => {
  const { holidays } = req.body;

  if (!Array.isArray(holidays) || holidays.length === 0) {
    throw new AppError("Holidays should be a non-empty array", 400);
  }

  for (let i = 0; i < holidays.length; i++) {
    const date = holidays[i];
    const alreadyPresent = await Holiday.findOne({ date });
    if (alreadyPresent) {
      throw new AppError(`already assign holiday ${alreadyPresent.date}`, 400);
    }
    await Holiday.create({ date });
  }

  res.status(201).json({
    message: "Done",
  });
});
