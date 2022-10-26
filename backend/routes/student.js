const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student");

router.get("/", studentController.index);
router.get("/:id", studentController.show);
router.delete("/:id", studentController.remove);
router.post("/", studentController.create);
router.patch("/:id", studentController.update);

module.exports = router;
