const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoice");

router.get("/", invoiceController.index);
router.get(
  "/outstanding/:familyID",
  invoiceController.findOutstandingTransactions
);
router.get("/:id", invoiceController.show);
router.get("/sessions/:familyID/:startDate", invoiceController.findSessions);
router.post("/", invoiceController.create);
router.patch("/:id", invoiceController.update);

module.exports = router;
