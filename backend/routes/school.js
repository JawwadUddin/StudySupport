const express = require("express");
const router = express.Router();
const schoolController = require("../controllers/school");

router.get("/", schoolController.index);
router.post("/", schoolController.create);
router.post("/:id", schoolController.update);

module.exports = router;
