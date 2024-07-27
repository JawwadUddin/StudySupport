const Transaction = require("../models/Transaction");
const { success, error } = require("../helper/responseApi");

async function index(req, res) {
  try {
    const { startDate, endDate } = req.params;

    if (!startDate || !endDate) {
      return res
        .status(400)
        .send({ error: "Start date and end date are required" });
    }
    const transactions = await Transaction.findTransactions(startDate, endDate);
    res.status(200).json(success("OK", { data: transactions }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

module.exports = { index };
