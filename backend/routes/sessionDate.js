const express = require("express");
const router = express.Router();
const sessionDateController = require("../controllers/sessionDate");

router.get("/", sessionDateController.index);
router.post("/", sessionDateController.create);

module.exports = router;
