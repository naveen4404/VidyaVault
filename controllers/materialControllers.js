const Material = require("../models/materialModel");
const ApiFeatures = require("../utils/ApiFeatures");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// retrieving all the materials
exports.getMaterials = catchAsync(async (req, res, next) => {
  const materialQuery = new ApiFeatures(Material.find(), req.query);
  materialQuery.filter().sort().fields();
  const materials = await materialQuery.query;
  res.status(200).json({
    status: "success",
    noOfMaterials: materials.length,
    data: materials,
  });
});

// uploading material
exports.uploadMaterial = catchAsync(async (req, res, next) => {
  const data = { ...req.body, uploadedBy: req.user._id };
  const material = await Material.create(data);
  res.status(201).json({
    status: "material uploaded",
    materialID: material._id,
  });
});

// retrieving a particular material with id
exports.getMaterial = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const material = await Material.findById(id).select("-__v");
  if (!material) {
    return next(new AppError("material not found with the id", 404));
  }
  res.status(200).json({
    status: "success",
    data: material,
  });
});

// deleting a material
exports.deleteMaterial = catchAsync(async (req, res, next) => {
  //only admin can do this and the user who own that material
  const id = req.params.id;
  const material = await Material.findById(id);
  if (!material) {
    return next(new AppError("material with the id is not found", 404));
  }
  if (
    !(
      String(material.uploadedBy) === String(req.user._id) ||
      req.user.role === "admin"
    )
  ) {
    return next(
      new AppError("you are not authorized to perform this action", 402)
    );
  }
  await material.deleteOne();

  res.status(204).json({
    status: "success",
  });
});
