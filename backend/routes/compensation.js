const express = require("express");
const router = express.Router();
const compensationController = require("../controllers/compensation");

router.get("/", compensationController.index);

module.exports = router;
