import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import cloudinary from "../utils/cloudinary.js";

const router = express.Router();

const __dirname = path.resolve();
// console.log(__dirname);
const uploadFile = path.join(__dirname, "/public/uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFile);
  },

  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const imageFiletypes = /jpe?g|png|webp/;
  const imageMimetypes = /image\/jpeg|image\/jpg|image\/png|image\/webp/;
  const pdfFiletypes = /pdf/;
  const pdfMimetypes = /application\/pdf/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  // Check if the file is an image or a PDF
  if (
    (imageFiletypes.test(extname) && imageMimetypes.test(mimetype)) ||
    (pdfFiletypes.test(extname) && pdfMimetypes.test(mimetype))
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only images (jpeg, png, webp) and PDF files are allowed."
      ),
      false
    );
  }
};

const upload = multer({ storage, fileFilter });

router.post("/", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      status: "failed",
      message: "No file uploaded.",
    });
  }

  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto", // Automatically detect file type (image, video, etc.)
    });

    fs.unlinkSync(req.file.path, (err) => {
      if (err) {
        console.error("Failed to delete local file:", err);
      }
    });

    return res.status(200).json({
      public_id: uploadResult.public_id,
      original_name: req.file.originalname,
      src: uploadResult.secure_url,
    });
  } catch (error) {
    // Error handling if Cloudinary upload fails
    console.error("Error uploading to Cloudinary:", error);
    return res.status(500).json({
      status: "failed",
      message: "Error uploading file to Cloudinary.",
    });
  }
});

export default router;
