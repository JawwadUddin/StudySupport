const sql = require("mssql");
const { dbConnect } = require("../db");

class Invoice {
  constructor(data) {
    this.id = data.invoice_id;
    this.familyID = data.family_id;
    this.invoiceDate = data.invoice_date;
    this.dueDate = data.due_date;
    this.startDate = data.start_date;
    this.amountDue = data.amount_due;
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const invoiceData = await pool.request().execute("SelectAllInvoices");
        const invoices = invoiceData.recordset.map((d) => new Invoice(d));
        resolve(invoices);
      } catch (err) {
        reject(err);
      }
    });
  }

  static findByID(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const invoiceData = await pool
          .request()
          .input("InvoiceID", sql.Int, id)
          .execute("SelectInvoiceByID");
        const invoice = invoiceData.recordset.map((d) => new Invoice(d))[0];
        resolve(invoice);
      } catch (err) {
        reject(err);
      }
    });
  }

  static create(invoice) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const invoiceData = await pool
          .request()
          .input("FamilyID", sql.Int, invoice.familyID)
          .input("InvoiceDate", sql.Date, invoice.invoiceDate)
          .input("DueDate", sql.Date, invoice.dueDate)
          .input("StartDate", sql.Date, invoice.startDate)
          .input("AmountDue", sql.Decimal(6, 2), invoice.amountDue)
          .input(
            "JSONInvoiceMisc",
            sql.VarChar,
            JSON.stringify(invoice.JSONInvoiceMisc)
          )
          .output("InvoiceID", sql.Int)
          .execute("InsertInvoice");
        const newInvoice = invoiceData.output.InvoiceID;
        resolve({ newInvoiceID: newInvoice });
      } catch (err) {
        reject("Error creating invoice: " + err.message);
      }
    });
  }

  static edit(id, invoice) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const invoiceData = await pool
          .request()
          .input("InvoiceID", sql.Int, id)
          .input("InvoiceDate", sql.Date, invoice.invoiceDate)
          .input("DueDate", sql.Date, invoice.dueDate)
          .input(
            "JSONInvoiceMisc",
            sql.VarChar,
            JSON.stringify(invoice.JSONInvoiceMisc)
          )
          .execute("UpdateInvoice");
        resolve("Invoice successfully updated");
      } catch (err) {
        reject("Error updating invoice: " + err.message);
      }
    });
  }
}

module.exports = Invoice;
