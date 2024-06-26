const Register = require("../models/Register");
const { success, error } = require("../helper/responseApi");

async function index(req, res) {
  try {
    const sessionDateID = req.params.sessionDateID;
    const register = await Register.find(sessionDateID);
    res.status(200).json(success("OK", { data: register }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

async function create(req, res) {
  const submittedData = req.body.data;
  try {
    const sessionDate = await Register.create(submittedData);
    res.status(201).json(success("OK", { data: sessionDate }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

async function update(req, res) {
  try {
    const changes = req.body.data;
    const register = await Register.edit(changes);
    res.status(200).json(success("OK", { data: register }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

async function remove(req, res) {
  const sessionDateID = req.params.sessionDateID;
  try {
    const register = await Register.findByIDAndDelete(sessionDateID);
    res.status(204).json(success("OK", { data: register }, res.statusCode));
  } catch (err) {
    res.status(404).json(error(err, res.statusCode));
  }
}

module.exports = { index, create, update, remove };
