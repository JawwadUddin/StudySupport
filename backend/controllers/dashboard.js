const Invoice = require("../models/invoice");
const Payment = require("../models/Payment");
const SessionDate = require("../models/SessionDate");
const { success, error } = require("../helper/responseApi");

async function summary(req, res) {
  try {
    const [balanceSummary, monthlyPayments, sessionsThisMonth] =
      await Promise.all([
        Invoice.balanceSummary(),
        Payment.monthlyPaymentSummary(),
        SessionDate.countThisMonth(),
      ]);

    const data = {
      balanceSummary: {
        overdueBalance: balanceSummary.overdueBalance,
        openBalance: balanceSummary.openBalance,
        overdueInvoices: balanceSummary.overdueInvoices,
        openInvoices: balanceSummary.openInvoices,
      },
      monthlyPayments,
      sessionsThisMonth,
    };

    res.status(200).json(success("OK", { data }, res.statusCode));
  } catch (err) {
    console.log(err);
    res.status(500).json(error(err, res.statusCode));
  }
}

module.exports = { summary };
