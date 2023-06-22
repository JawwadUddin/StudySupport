const sql = require("mssql");
const { dbConnect } = require("../db");

class Payment {
  constructor(data) {
    this.id = data.payment_id;
    this.familyID = data.family_id;
    this.fullName = data.full_name;
    this.paymentDate = data.payment_date;
    this.amountPaid = data.amount;
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

  static findByID(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const paymentData = await pool
          .request()
          .input("PaymentID", sql.Int, id)
          .execute("SelectPaymentByID");
        const payment = paymentData.recordset.map((d) => new Payment(d))[0];
        resolve(payment);
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = Payment;
