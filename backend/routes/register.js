const express = require("express");
const router = express.Router();
const registerController = require("../controllers/register");

router.get("/:sessionDateID", registerController.index);
router.patch("/", registerController.update);

module.exports = router;
