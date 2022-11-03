const Score = require("../models/Score");
const { success, error } = require("../helper/responseApi");

async function show(req, res) {
  const studentID = req.params.studentID;
  const testID = req.params.testID;
  try {
    const scores = await Score.studentScore(studentID, testID);
    res.status(200).json(success("OK", { data: scores }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

async function create(req, res) {
  const submittedScores = req.body.data;
  try {
    const score = await Score.create(submittedScores);
    res.status(201).json(success("OK", { data: score }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

async function update(req, res) {
  const submittedScores = req.body.data;
  try {
    const score = await Score.edit(submittedScores);
    res.status(200).json(success("OK", { data: score }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

module.exports = { show, create, update };