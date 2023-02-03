const express = require("express");
const router = express.Router();
const topicController = require("../controllers/topic");

router.get(
  "/:syllabusID/:studentID",
  topicController.showTopicsStudentTestedOn
);
router.delete("/:id", topicController.remove);
router.post("/", topicController.create);
router.patch("/:id", topicController.update);

module.exports = router;
