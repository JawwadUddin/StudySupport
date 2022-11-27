const Test = require("../models/Test");
const { success, error } = require("../helper/responseApi");

async function index(req, res) {
  try {
    const tests = await Test.all;
    res.status(200).json(success("OK", { data: tests }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

async function show(req, res) {
  const testID = req.params.id;

  try {
    const test = await Test.findByID(testID);
    res.status(200).json(success("OK", { data: test }, res.statusCode));
  } catch (err) {
    res.status(404).json(error(err, res.statusCode));
  }
}

async function studentCompleted(req, res) {
  const studentID = req.params.id;
  try {
    const test = await Test.studentTestsCompleted(studentID);
    res.status(200).json(success("OK", { data: test }, res.statusCode));
  } catch (err) {
    res.status(404).json(error(err, res.statusCode));
  }
}

async function create(req, res) {
  const submittedTest = req.body.data;
  try {
    const test = await Test.create(submittedTest);
    res.status(201).json(success("OK", { data: test }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

async function update(req, res) {
  const testID = req.params.id;
  const submittedTest = req.body.data;
  try {
    const test = await Test.edit(testID, submittedTest);
    res.status(200).json(success("OK", { data: test }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

async function remove(req, res) {
  const testID = req.params.id;
  try {
    const test = await Test.findByIDAndDelete(testID);
    res.status(204).json(success("OK", { data: test }, res.statusCode));
  } catch (err) {
    res.status(404).json(error(err, res.statusCode));
  }
}

module.exports = { index, show, create, update, studentCompleted, remove };
