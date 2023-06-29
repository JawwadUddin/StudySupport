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
  const familyID = req.params.familyID;
  const paymentDate = req.params.paymentDate;
  try {
    const payment = await Payment.findByFamilyIDPaymentDate(
      familyID,
      paymentDate
    );
    res.status(200).json(success("OK", { data: payment }, res.statusCode));
  } catch (err) {
    res.status(404).json(error(err, res.statusCode));
  }
}

async function create(req, res) {
  const submittedData = req.body.data;
  try {
    const payment = await Payment.create(submittedData);
    res.status(201).json(success("OK", { data: payment }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

module.exports = { index, show, create };
