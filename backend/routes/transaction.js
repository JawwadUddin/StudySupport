const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction");

router.get("/:startDate/:endDate", transactionController.index);

module.exports = router;
