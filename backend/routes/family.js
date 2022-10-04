const express = require("express");
const router = express.Router();
const familyController = require("../controllers/family");

router.get("/", familyController.index);
router.get("/:id", familyController.show);
router.post("/", familyController.create);
router.post("/:id", familyController.update);

module.exports = router;
