const Syllabus = require("../models/Syllabus");
const { success, error } = require("../helper/responseApi");

async function index(req, res) {
  try {
    const syllabuses = await Syllabus.all;
    res.status(200).json(success("OK", { data: syllabuses }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

module.exports = { index };
