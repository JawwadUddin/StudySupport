const sql = require("mssql");
const { dbConnect } = require("../db");

class Payment {
  constructor(data) {
    this.paymentID = data.payment_id;
    this.familyID = data.family_id;
    this.fullName = data.full_name;
    this.paymentDate = data.payment_date;
    this.id = data.invoice_id;
    this.payment = data.payment;
    this.dueDate = data.due_date;
    this.amountDue = data.amount_due;
    this.amountPaid = data.amount_paid;
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const paymentData = await pool.request().execute("SelectAllPayments");
        const payments = paymentData.recordset.map((d) => new Payment(d));
        resolve(payments);
      } catch (err) {
        reject(err);
      }
    });
  }

  static findByFamilyIDPaymentDate(id, paymentDate) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const paymentData = await pool
          .request()
          .input("FamilyID", sql.Int, id)
          .input("PaymentDate", sql.Date, paymentDate)
          .output("PaymentType", sql.VarChar)
          .execute("SelectPaymentsByFamilyIDPaymentDate");
        const paymentType = paymentData.output.PaymentType;
        const payment = paymentData.recordset.map((d) => new Payment(d));
        resolve({ payment, paymentType });
      } catch (err) {
        reject(err);
      }
    });
  }

  static create(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const paymentData = await pool
          .request()
          .input("FamilyID", sql.Int, data.familyID)
          .input("PaymentDate", sql.Date, data.paymentDate)
          .input("PaymentType", sql.VarChar, data.paymentType)
          .input(
            "JSONTransactionInfo",
            sql.VarChar,
            JSON.stringify(data.outstandingTransactions)
          )
          .input("Credit", sql.Decimal(5, 2), data.credit)
          .execute("InsertPayments");
        resolve("Successfully created payments");
      } catch (err) {
        reject(err.message);
      }
    });
  }

  static edit(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const paymentData = await pool
          .request()
          .input("FamilyID", sql.Int, data.familyID)
          .input("PaymentDate", sql.Date, data.paymentDate)
          .input("PaymentType", sql.VarChar, data.paymentType)
          .input(
            "JSONTransactionInfo",
            sql.VarChar,
            JSON.stringify(data.outstandingTransactions)
          )
          .input("Credit", sql.Decimal(6, 2), data.credit)
          .execute("UpdatePayments");
        resolve("Successfully udpated payments");
      } catch (err) {
        reject("Error creating payments: " + err.message);
      }
    });
  }
}

module.exports = Payment;
