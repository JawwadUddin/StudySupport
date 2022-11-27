const Score = require("../models/Score");
const TestComment = require("../models/TestComment");
const { success, error } = require("../helper/responseApi");

async function show(req, res) {
  const studentID = req.params.studentID;
  const testID = req.params.testID;
  try {
    const scores = await Score.studentScore(studentID, testID);
    const testComment = await TestComment.studentTestComment(studentID, testID);
    res
      .status(200)
      .json(success("OK", { data: { scores, testComment } }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

async function create(req, res) {
  const data = req.body.data;
  try {
    const score = await Score.create(data);
    const testComment = await TestComment.create(data);
    res.status(201).json(success("OK", { data: score }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

async function update(req, res) {
  const scoreID = req.params.id;
  const submittedScore = req.body.data;
  try {
    const score = await Score.edit(scoreID, submittedScore);
    res.status(200).json(success("OK", { data: score }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

module.exports = { show, create, update };
