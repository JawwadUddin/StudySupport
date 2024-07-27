const sql = require("mssql");
const { dbConnect } = require("../db");

class Transaction {
  constructor(data) {
    this.invoiceID = data.invoice_id;
    this.invoiceDate = data.start_date;
    this.fullName = data.full_name;
    this.amountDue = data.amount_due;
    this.paymentDate = data.payment_date;
    this.amountPaid = data.amount;
    this.paymentType = data.payment_type;
  }

  static findTransactions(startDate, endDate) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const transactions = await pool
          .request()
          .input("startDate", sql.Date, startDate)
          .input("endDate", sql.Date, endDate)
          .execute("SelectTransactionSummary");
        const invoices = transactions.recordsets[0].map(
          (d) => new Transaction(d)
        );
        const payments = transactions.recordsets[1].map(
          (d) => new Transaction(d)
        );
        resolve({ invoices, payments });
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = Transaction;
