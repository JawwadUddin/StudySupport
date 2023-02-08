const Register = require("../models/Register");
const { success, error } = require("../helper/responseApi");

async function index(req, res) {
  try {
    const sessionDate = req.params.sessionDate;
    const register = await Register.find(sessionDate);
    res.status(200).json(success("OK", { data: register }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

module.exports = { index };
