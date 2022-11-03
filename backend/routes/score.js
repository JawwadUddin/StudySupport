const express = require("express");
const router = express.Router();
const scoreController = require("../controllers/score");

router.get("/:studentID/:testID", scoreController.show);
router.get("/", scoreController.show);
router.patch("/", scoreController.update);

module.exports = router;