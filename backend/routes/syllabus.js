const express = require("express");
const router = express.Router();
const syllabusController = require("../controllers/syllabus");

router.get("/", syllabusController.index);

module.exports = router;
