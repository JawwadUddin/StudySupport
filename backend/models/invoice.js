const sql = require("mssql");
const { dbConnect } = require("../db");

class Invoice {
  constructor(data) {
    this.id = data.invoice_id;
    this.familyID = data.family_id;
    this.firstName = data.first_name; 
    this.lastName = data.last_name; 
    this.address = data.address;
    this.postCode = data.post_code;
    this.mobile = data.mobile;
    this.email = data.email;
    this.invoiceDate = data.invoice_date;
    this.dueDate = data.due_date;
    this.startDate = data.start_date;
    this.amountDue = data.amount_due;
    this.amountPaid = data.amount_paid;
    this.JSONInvoiceMisc = data.JSONInvoiceMisc
      ? JSON.parse(data.JSONInvoiceMisc)
      : [];
    this.students = data.students;
    this.overdueInvoices = data.overdue_invoices;
    this.openInvoices = data.open_invoices;
    this.overdueBalance = data.overdue_balance;
    this.openBalance = data.open_balance;
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

  static sessionsForInvoice(familyID, startDate) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const sessionsData = await pool
          .request()
          .input("FamilyID", sql.Int, familyID)
          .input("StartDate", sql.Date, startDate)
          .execute("SelectSessionsForInvoice");
        resolve(JSON.parse(sessionsData.recordset[0].students));
      } catch (err) {
        reject(err);
      }
    });
  }

  static outstandingInvoices() {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const paymentsData = await pool
          .request()
          .execute("SelectOutstandingInvoices");
        const payments = paymentsData.recordset.map((d) => new Invoice(d));
        resolve(payments);
      } catch (err) {
        reject(err);
      }
    });
  }

  static outstandingTransactionsByFamilyID(familyID) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const paymentsData = await pool
          .request()
          .input("FamilyID", sql.Int, familyID)
          .execute("SelectOutstandingInvoicesByFamilyID");
        const payments = paymentsData.recordset.map((d) => new Invoice(d));
        resolve(payments);
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
          .input(
            "JSONRateInfo",
            sql.VarChar,
            JSON.stringify(invoice.JSONRateInfo)
          )
          .output("InvoiceID", sql.Int)
          .execute("InsertInvoice");
        const newInvoice = invoiceData.output.InvoiceID;
        resolve({ newInvoiceID: newInvoice });
      } catch (err) {
        reject(err.message);
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
          .input("StartDate", sql.Date, invoice.startDate)
          .input("AmountDue", sql.Decimal(6, 2), invoice.amountDue)
          .input(
            "JSONInvoiceMisc",
            sql.VarChar,
            JSON.stringify(invoice.JSONInvoiceMisc)
          )
          .input(
            "JSONRateInfo",
            sql.VarChar,
            JSON.stringify(invoice.JSONRateInfo)
          )
          .execute("UpdateInvoice");
        resolve("Invoice successfully updated");
      } catch (err) {
        reject("Error updating invoice: " + err.message);
      }
    });
  }

  static delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const invoiceData = await pool
          .request()
          .input("InvoiceID", sql.Int, id)
          .execute("DeleteInvoiceByID");
        resolve("Invoice successfully deleted");
      } catch (err) {
        reject(err);
      }
    });
  }

  static balanceSummary() {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const invoiceData = await pool
          .request()
          .execute("SelectBalanceSummary");
        const invoice = invoiceData.recordset.map((d) => new Invoice(d))[0];
        resolve(invoice);
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = Invoice;
