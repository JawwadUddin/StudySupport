const express = require("express");
const router = express.Router();
const scoreController = require("../controllers/score");

router.get("/:studentID/:testID", scoreController.show);
router.post("/", scoreController.create);
router.patch("/", scoreController.update);

module.exports = router;
