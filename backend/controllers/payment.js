const Payment = require("../models/Payment");
const { success, error } = require("../helper/responseApi");

async function index(req, res) {
  try {
    const payments = await Payment.all;
    res.status(200).json(success("OK", { data: payments }, res.statusCode));
  } catch (err) {
    console.log(err);
    res.status(500).json(error(err, res.statusCode));
  }
}

async function show(req, res) {
  const paymentID = req.params.id;
  try {
    const payment = await Payment.findByID(paymentID);
    res.status(200).json(success("OK", { data: payment }, res.statusCode));
  } catch (err) {
    res.status(404).json(error(err, res.statusCode));
  }
}

module.exports = { index, show };
