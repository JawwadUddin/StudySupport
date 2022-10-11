const sql = require("mssql");
const { dbConnect } = require("../db");

class Relation {
  constructor(data) {
    this.id = data.relation_id;
    this.relationToChild = data.relation_to_child;
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const relationData = await pool.request().execute("SelectAllRelations");
        const relations = relationData.recordset.map((d) => new Relation(d));
        resolve(relations);
      } catch (err) {
        reject(err);
      }
    });
  }

  static create(relation) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const relationData = await pool
          .request()
          .input("Relation", sql.VarChar, relation)
          .execute("InsertRelation");
        resolve("Successfully created new relation");
      } catch (err) {
        reject("Error creating relation: " + err.message);
      }
    });
  }

  static edit(id, relation) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const relationData = await pool
          .request()
          .input("RelationID", sql.Int, id)
          .input("Relation", sql.VarChar, relation)
          .execute("UpdateRelation");
        resolve("Relation successfully updated");
      } catch (err) {
        reject("Error updating relation: " + err.message);
      }
    });
  }
}

module.exports = Relation;
