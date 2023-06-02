const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoice");

router.get("/", invoiceController.index);
router.get("/:id", invoiceController.show);
router.post("/", invoiceController.create);
router.patch("/:id", invoiceController.update);

module.exports = router;
