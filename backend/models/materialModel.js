const mongoose = require("mongoose");

const materialSchema = mongoose.Schema({
  subject: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now(),
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  fileId: {
    type: String,
    required: true,
    unique: [true, "material is already exists"],
  },
});
materialSchema.index({ title: "text", subject: "text", description: "text" });
const Material = mongoose.model("Material", materialSchema);

module.exports = Material;
