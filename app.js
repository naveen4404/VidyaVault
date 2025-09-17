const express = require("express");
const materialControllers = require("./controllers/materialControllers");
const app = express();
app
  .route("/api/materials")
  .get(materialControllers.getMaterials)
  .post(materialControllers.uploadMaterial);

module.exports = app;
