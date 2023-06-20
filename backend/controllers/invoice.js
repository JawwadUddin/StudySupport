const Invoice = require("../models/invoice");
const { success, error } = require("../helper/responseApi");

async function index(req, res) {
  try {
    const invoices = await Invoice.all;
    res.status(200).json(success("OK", { data: invoices }, res.statusCode));
  } catch (err) {
    console.log(err);
    res.status(500).json(error(err, res.statusCode));
  }
}

async function show(req, res) {
  const invoiceID = req.params.id;
  try {
    const invoice = await Invoice.findByID(invoiceID);
    res.status(200).json(success("OK", { data: invoice }, res.statusCode));
  } catch (err) {
    res.status(404).json(error(err, res.statusCode));
  }
}

async function findSessions(req, res) {
  try {
    const familyID = req.params.familyID;
    const startDate = req.params.startDate;
    const sessions = await Invoice.sessionsForInvoice(familyID, startDate);
    res.status(200).json(success("OK", { data: sessions }, res.statusCode));
  } catch (err) {
    res.status(404).json(error(err, res.statusCode));
  }
}

async function create(req, res) {
  const submittedInvoice = req.body.data;
  try {
    const invoice = await Invoice.create(submittedInvoice);
    res.status(201).json(success("OK", { data: invoice }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

async function update(req, res) {
  const invoiceID = req.params.id;
  const submittedInvoice = req.body.data;
  try {
    const invoice = await Invoice.edit(invoiceID, submittedInvoice);
    res.status(200).json(success("OK", { data: invoice }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

module.exports = { index, show, create, update, findSessions };
