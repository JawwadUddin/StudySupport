const Syllabus = require("../models/Syllabus");
const { success, error } = require("../helper/responseApi");

async function index(req, res) {
  try {
    const syllabuses = await Syllabus.all;
    res.status(200).json(success("OK", { data: syllabuses }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

async function showTopics(req, res) {
  const syllabusID = req.params.id;
  try {
    const topics = await Syllabus.findTopicsByID(syllabusID);
    res.status(200).json(success("OK", { data: topics }, res.statusCode));
  } catch (err) {
    res.status(404).json(error(err, res.statusCode));
  }
}

async function showTests(req, res) {
  const syllabusID = req.params.id;
  try {
    const tests = await Syllabus.findTestsByID(syllabusID);
    res.status(200).json(success("OK", { data: tests }, res.statusCode));
  } catch (err) {
    res.status(404).json(error(err, res.statusCode));
  }
}

async function create(req, res) {
  const submittedSyllabus = req.body.data;
  try {
    const syllabus = await Syllabus.create(submittedSyllabus);
    res.status(201).json(success("OK", { data: syllabus }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

module.exports = { index, showTopics, showTests, create };
