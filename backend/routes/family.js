const express = require("express");
const router = express.Router();
const familyController = require("../controllers/family");

router.get("/", familyController.index);
router.get("/:id", familyController.show);
router.delete("/:id", familyController.remove);
router.get("/:id/students", familyController.showStudents);
router.post("/", familyController.create);
router.patch("/:id", familyController.update);

module.exports = router;
