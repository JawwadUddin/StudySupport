const express = require("express");
const router = express.Router();
const registerController = require("../controllers/register");

router.get("/:sessionDate", registerController.index);

module.exports = router;
