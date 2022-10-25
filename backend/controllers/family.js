const Family = require("../models/Family");
const { success, error } = require("../helper/responseApi");

async function index(req, res) {
  try {
    const families = await Family.all;
    res.status(200).json(success("OK", { data: families }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

async function show(req, res) {
  const familyID = req.params.id;
  try {
    const family = await Family.findByID(familyID);
    res.status(200).json(success("OK", { data: family }, res.statusCode));
  } catch (err) {
    res.status(404).json(error(err, res.statusCode));
  }
}

async function showStudents(req, res) {
  const familyID = req.params.id;
  try {
    const students = await Family.findStudents(familyID);
    res.status(200).json(success("OK", { data: students }, res.statusCode));
  } catch (err) {
    res.status(404).json(error(err, res.statusCode));
  }
}

async function create(req, res) {
  const submittedFamily = req.body.data;
  try {
    const family = await Family.create(submittedFamily);
    res.status(201).json(success("OK", { data: family }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

async function update(req, res) {
  const familyID = req.params.id;
  const submittedFamily = req.body.data;
  try {
    const family = await Family.edit(familyID, submittedFamily);
    res.status(200).json(success("OK", { data: family }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

module.exports = { index, show, showStudents, create, update };
