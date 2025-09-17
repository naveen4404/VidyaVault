const Material = require("../models/materialModel");

exports.getMaterials = async (req, res) => {
  const material = await Material.find();
  res.status(200).json({
    status: "success",
    data: material,
  });
};

exports.uploadMaterial = async (req, res) => {
  try {
    const material = await Material.create(req.body);
    res.status(200).json({
      status: "success",
      material: material,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
