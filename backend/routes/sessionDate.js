const express = require("express");
const router = express.Router();
const sessionDateController = require("../controllers/sessionDate");

router.get("/", sessionDateController.index);

module.exports = router;
