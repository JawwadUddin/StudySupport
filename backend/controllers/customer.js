const Customer = require("../models/Customer");
const { success, error } = require("../helper/responseApi");

async function show(req, res) {
  const customerID = req.params.id;
  try {
    const customer = await Customer.findByFamilyID(customerID);
    res.status(200).json(success("OK", { data: customer }, res.statusCode));
  } catch (err) {
    res.status(404).json(error(err, res.statusCode));
  }
}

module.exports = {
  show,
};
