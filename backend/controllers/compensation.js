const Compensation = require("../models/Compensation");
const { success, error } = require("../helper/responseApi");

async function index(req, res) {
  try {
    const sessionDate = req.params.sessionDateID;
    const compensations = await Compensation.find(sessionDate);
    res
      .status(200)
      .json(success("OK", { data: compensations }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

module.exports = { index };
