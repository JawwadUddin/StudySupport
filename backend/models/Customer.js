const sql = require("mssql");
const { dbConnect } = require("../db");

class Customer {
  constructor(data) {
    this.date = data.date;
    this.type = data.type;
    this.id = data.id;
    this.amountDue = data.amount_due;
    this.credit = data.credit;
    this.amountPaid = data.amount_paid;
    this.status = data.status;
  }

  static findByFamilyID(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const transactionDate = await pool
          .request()
          .input("FamilyID", sql.Int, id)
          .execute("SelectTransactionsByFamilyId");
        const transactions = transactionDate.recordset.map(
          (d) => new Customer(d)
        );
        resolve(transactions);
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = Customer;
