const Relation = require("../models/Relation");
const { success, error } = require("../helper/responseApi");

async function index(req, res) {
  try {
    const relations = await Relation.all;
    res.status(200).json(success("OK", { data: relations }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

async function create(req, res) {
  const submittedRelation = req.body.data;
  try {
    const relation = await Relation.create(submittedRelation);
    res.status(201).json(success("OK", { data: relation }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

async function update(req, res) {
  const relationID = req.params.id;
  const submittedRelation = req.body.data;
  try {
    const relation = await Relation.edit(relationID, submittedRelation);
    res.status(200).json(success("OK", { data: relation }, res.statusCode));
  } catch (err) {
    res.status(500).json(error(err, res.statusCode));
  }
}

module.exports = { index, create, update };
