const Question = require("../models/Question");
const { success, error } = require("../helper/responseApi");

async function create(req, res) {
  const submittedQuestion = req.body.data;
  try {
    const question = await Question.create(submittedQuestion);
    res.status(201).json(success("OK", { data: question }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

async function update(req, res) {
  const questionID = req.params.id;
  const submittedQuestion = req.body.data;
  try {
    const question = await Question.edit(questionID, submittedQuestion);
    res.status(200).json(success("OK", { data: question }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

async function remove(req, res) {
  const questionID = req.params.id;
  try {
    const question = await Question.delete(questionID);
    res.status(204).json(success("OK", { data: question }, res.statusCode));
  } catch (err) {
    res.status(404).json(error(err, res.statusCode));
  }
}

module.exports = { create, update, remove };
