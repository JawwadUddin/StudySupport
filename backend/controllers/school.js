const School = require("../models/School");
const { success, error } = require("../helper/responseApi");

async function index(req, res) {
  try {
    const schools = await School.all;
    res.status(200).json(success("OK", { data: schools }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

async function create(req, res) {
  const submittedSchool = req.body.data;
  try {
    const school = await School.create(submittedSchool);
    res.status(201).json(success("OK", { data: school }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

async function update(req, res) {
  const schoolID = req.params.id;
  const submittedSchool = req.body.data;
  try {
    const school = await School.edit(schoolID, submittedSchool);
    res.status(200).json(success("OK", { data: school }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

module.exports = { index, create, update };
