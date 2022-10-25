const Student = require("../models/Student");
const { success, error } = require("../helper/responseApi");

async function index(req, res) {
  try {
    const students = await Student.all;
    res.status(200).json(success("OK", { data: students }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

async function show(req, res) {
  const studentID = req.params.id;
  try {
    const student = await Student.findByID(studentID);
    res.status(200).json(success("OK", { data: student }, res.statusCode));
  } catch (err) {
    res.status(404).json(error(err, res.statusCode));
  }
}

async function remove(req, res) {
  const studentID = req.params.id;
  try {
    const student = await Student.findByIDAndDelete(studentID);
    res.status(204).json(success("OK", { data: student }, res.statusCode));
  } catch (err) {
    res.status(404).json(error(err, res.statusCode));
  }
}

async function create(req, res) {
  const submittedStudent = req.body.data;
  try {
    const student = await Student.create(submittedStudent);
    res.status(201).json(success("OK", { data: student }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

async function update(req, res) {
  const studentId = req.params.id;
  const submittedStudent = req.body.data;
  try {
    const student = await Student.edit(studentId, submittedStudent);
    res.status(200).json(success("OK", { data: student }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

module.exports = { index, show, create, update, remove };
