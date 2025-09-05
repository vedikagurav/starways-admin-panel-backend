// models/Drawing.js
import mongoose from "mongoose";

const drawingSchema = new mongoose.Schema(
  {
    drawingNo: { type: String, required: true },
    filePath: { type: String, required: true },
  },
  { timestamps: true } // ✅ adds createdAt & updatedAt
);

export default mongoose.model("Drawing", drawingSchema);
