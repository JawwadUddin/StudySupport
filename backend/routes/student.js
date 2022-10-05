const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student");

router.get("/", studentController.index);
router.get("/:id", studentController.show);
router.post("/", studentController.create);
router.post("/:id", studentController.update);

module.exports = router;
