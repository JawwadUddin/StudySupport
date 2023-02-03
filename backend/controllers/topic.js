const Topic = require("../models/Topic");
const { success, error } = require("../helper/responseApi");

async function create(req, res) {
  const submittedTopic = req.body.data;
  try {
    const topic = await Topic.create(submittedTopic);
    res.status(201).json(success("OK", { data: topic }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

async function showTopicsStudentTestedOn(req, res) {
  const syllabusID = req.params.syllabusID;
  const studentID = req.params.studentID;
  try {
    const topics = await Topic.findTopicsStudentTestedOn(studentID, syllabusID);
    res.status(200).json(success("OK", { data: topics }, res.statusCode));
  } catch (err) {
    res.status(404).json(error(err, res.statusCode));
  }
}

async function update(req, res) {
  const topicID = req.params.id;
  const submittedTopic = req.body.data;
  try {
    const topic = await Topic.edit(topicID, submittedTopic);
    res.status(200).json(success("OK", { data: topic }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

async function remove(req, res) {
  const topicID = req.params.id;
  try {
    const topic = await Topic.delete(topicID);
    res.status(204).json(success("OK", { data: topic }, res.statusCode));
  } catch (err) {
    res.status(404).json(error(err, res.statusCode));
  }
}

module.exports = { create, update, remove, showTopicsStudentTestedOn };
