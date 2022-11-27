const express = require("express");
const router = express.Router();
const testController = require("../controllers/test");

router.get("/", testController.index);
router.get("/:id", testController.show);
router.delete("/:id", testController.remove);
router.get("/completed/:id", testController.studentCompleted);
router.post("/", testController.create);
router.patch("/:id", testController.update);

module.exports = router;
