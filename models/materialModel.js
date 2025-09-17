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
    required: true,
  },
  uploadedBy: {
    type: String,
    trim: true,
  },
  fileLink: {
    type: String,
    required: true,
    trim: true,
  },
});

const Material = mongoose.model("Material", materialSchema);

module.exports = Material;
