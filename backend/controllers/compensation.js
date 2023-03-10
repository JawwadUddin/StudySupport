const Compensation = require("../models/Compensation");
const { success, error } = require("../helper/responseApi");

async function index(req, res) {
  try {
    const compensations = await Compensation.all;
    res
      .status(200)
      .json(success("OK", { data: compensations }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

module.exports = { index };
