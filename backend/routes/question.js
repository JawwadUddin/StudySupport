const express = require("express");
const router = express.Router();
const questionController = require("../controllers/question");

router.delete("/:id", questionController.remove);
router.post("/", questionController.create);
router.patch("/:id", questionController.update);

module.exports = router;
