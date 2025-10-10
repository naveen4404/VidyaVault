const express = require("express");
const materialControllers = require("../controllers/materialControllers");
const authControllers = require("../controllers/authControllers");
const router = express.Router();
router
  .route("/")
  .get(materialControllers.getMaterials)
  .post(authControllers.protect, materialControllers.uploadMaterial);
router
  .route("/:id")
  .get(materialControllers.getMaterial)
  .delete(authControllers.protect, materialControllers.deleteMaterial);
router.route("/search/:key").get(materialControllers.searchMaterials);
module.exports = router;
