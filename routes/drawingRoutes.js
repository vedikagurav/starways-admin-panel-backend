import express from "express";
import multer from "multer";
import path from "path";
import Drawing from "../models/Drawing.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Upload drawing
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { drawingNo, customerId } = req.body;
    const filePath = req.file.path;

    const drawing = await Drawing.create({
      drawingNo,
      filePath,
      customer: customerId || null,
    });

    res.json(drawing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all drawings
router.get("/", async (req, res) => {
  try {
    const drawings = await Drawing.find().sort({ createdAt: -1 }); // ✅ latest first
    res.json(drawings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
