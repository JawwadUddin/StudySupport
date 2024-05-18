const express = require("express");
const router = express.Router();
const registerController = require("../controllers/register");

router.get("/:sessionDateID", registerController.index);
router.post("/", registerController.create);
router.patch("/", registerController.update);
router.delete("/:sessionDateID", registerController.remove);

module.exports = router;
