const express = require("express");
const router = express.Router();
const relationController = require("../controllers/relation");

router.get("/", relationController.index);
router.post("/", relationController.create);
router.post("/:id", relationController.update);

module.exports = router;
