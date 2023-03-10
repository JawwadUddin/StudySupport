const SessionDate = require("../models/SessionDate");
const { success, error } = require("../helper/responseApi");

async function index(req, res) {
  try {
    const sessionDates = await SessionDate.all;
    res.status(200).json(success("OK", { data: sessionDates }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

async function create(req, res) {
  const submittedSessionDate = req.body.data;
  try {
    const sessionDate = await SessionDate.create(submittedSessionDate);
    res.status(201).json(success("OK", { data: sessionDate }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

module.exports = { index, create };
