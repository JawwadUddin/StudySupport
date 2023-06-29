const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment");

router.get("/", paymentController.index);
router.post("/", paymentController.create);
router.get("/:familyID/:paymentDate", paymentController.show);

module.exports = router;
