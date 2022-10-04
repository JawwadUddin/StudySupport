const sql = require("mssql");
const { dbConnect } = require("../db");

class Family {
  constructor(data) {
    this.id = data.family_id;
    this.full_name = data.full_name;
    this.address = data.address;
    this.city = data.city;
    this.postCode = data.post_code;
    this.mobile = data.mobile;
    this.email = data.email;
    this.ecFullName = data.ec_full_name;
    this.ecRelation = data.relation_to_child;
    this.ecAddress = data.ec_address;
    this.ecMobile = data.ec_mobile;
    this.notes = data.notes;
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const familyData = await pool
          .request()
          .query("select * from dbo.family");
        const family = familyData.recordset.map((d) => new Family(d));
        resolve(family);
      } catch (err) {
        reject(err);
      }
    });
  }

  static findByID(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const familyData = await pool
          .request()
          .input("FamilyID", sql.Int, id)
          .execute("portal.SelectFamilyByID");
        const family = familyData.recordset.map((d) => new Family(d))[0];
        resolve(family);
      } catch (err) {
        reject(err);
      }
    });
  }

  static create(family) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const familyData = await pool
          .request()
          .input("FullName", sql.VarChar, family.fullName)
          .input("Address", sql.VarChar, family.address)
          .input("City", sql.VarChar, family.city)
          .input("PostCode", sql.VarChar, family.postCode)
          .input("Mobile", sql.VarChar, family.mobile)
          .input("Email", sql.VarChar, family.email)
          .input("ecFullName", sql.VarChar, family.ecFullName)
          .input("ecRelation", sql.VarChar, family.ecRelation)
          .input("ecAddress", sql.VarChar, family.ecAddess)
          .input("ecMobile", sql.VarChar, family.ecMobile)
          .input("Notes", sql.VarChar, family.notes)
          .output("FamilyID", sql.Int)
          .execute("portal.InsertFamily");
        const newFamily = familyData.output.FamilyID;
        resolve({ newFamilyID: newFamily });
      } catch (err) {
        reject("Error creating family: " + err.message);
      }
    });
  }

  static edit(id, family) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const familyData = await pool
          .request()
          .input("FamilyID", sql.Int, id)
          .input("FullName", sql.VarChar, family.fullName)
          .input("Address", sql.VarChar, family.address)
          .input("City", sql.VarChar, family.city)
          .input("PostCode", sql.VarChar, family.postCode)
          .input("Mobile", sql.VarChar, family.mobile)
          .input("Email", sql.VarChar, family.email)
          .input("ecFullName", sql.VarChar, family.ecFullName)
          .input("ecRelation", sql.VarChar, family.ecRelation)
          .input("ecAddress", sql.VarChar, family.ecAddess)
          .input("ecMobile", sql.VarChar, family.ecMobile)
          .input("Notes", sql.VarChar, family.notes)
          .execute("portal.UpdateFamily");
        resolve("Family successfully updated");
      } catch (err) {
        reject("Error updating family: " + err.message);
      }
    });
  }
}

module.exports = Family;
