const express = require("express");
const router = express.Router();
const compensationController = require("../controllers/compensation");

router.get("/:sessionDateID", compensationController.index);

module.exports = router;
