const express = require("express");
const router = express.Router();
const syllabusController = require("../controllers/syllabus");

router.get("/", syllabusController.index);
router.get("/:id/topics", syllabusController.showTopics);
router.get("/:id/tests", syllabusController.showTests);
router.post("/", syllabusController.create);

module.exports = router;
