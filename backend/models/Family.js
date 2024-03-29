const sql = require("mssql");
const { dbConnect } = require("../db");
const Student = require("./Student");

class Family {
  constructor(data) {
    this.id = data.family_id;
    this.firstName = data.first_name;
    this.lastName = data.last_name;
    this.address = data.address;
    this.postCode = data.post_code;
    this.mobile = data.mobile;
    this.email = data.email;
    this.ecFullName = data.ec_full_name;
    this.ecRelation = data.relation_to_child;
    this.ecAddress = data.ec_address;
    this.ecPostCode = data.ec_post_code;
    this.ecMobile = data.ec_mobile;
    this.notes = data.notes;
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const familyData = await pool.request().execute("SelectAllFamilies");
        const families = familyData.recordset.map((d) => new Family(d));
        resolve(families);
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
          .execute("SelectFamilyByID");
        const family = familyData.recordset.map((d) => new Family(d))[0];
        resolve(family);
      } catch (err) {
        reject(err);
      }
    });
  }

  static findByIDAndDelete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const studentData = await pool
          .request()
          .input("FamilyID", sql.Int, id)
          .execute("DeleteFamilyByID");
        resolve("Family successfully deleted");
      } catch (err) {
        reject(err);
      }
    });
  }

  static findStudents(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const familyData = await pool
          .request()
          .input("FamilyID", sql.Int, id)
          .execute("SelectStudentsOfFamily");
        const family = familyData.recordset.map((d) => new Student(d));
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
          .input("FirstName", sql.VarChar, family.firstName)
          .input("LastName", sql.VarChar, family.lastName)
          .input("Address", sql.VarChar, family.address)
          .input("PostCode", sql.VarChar, family.postCode)
          .input("Mobile", sql.VarChar, family.mobile)
          .input("Email", sql.VarChar, family.email)
          .input("ecFullName", sql.VarChar, family.ecFullName)
          .input("ecRelation", sql.VarChar, family.ecRelation)
          .input("ecAddress", sql.VarChar, family.ecAddress)
          .input("ecPostCode", sql.VarChar, family.ecPostCode)
          .input("ecMobile", sql.VarChar, family.ecMobile)
          .input("Notes", sql.VarChar, family.notes)
          .output("FamilyID", sql.Int)
          .execute("InsertFamily");
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
          .input("FirstName", sql.VarChar, family.firstName)
          .input("LastName", sql.VarChar, family.lastName)
          .input("Address", sql.VarChar, family.address)
          .input("PostCode", sql.VarChar, family.postCode)
          .input("Mobile", sql.VarChar, family.mobile)
          .input("Email", sql.VarChar, family.email)
          .input("ecFullName", sql.VarChar, family.ecFullName)
          .input("ecRelation", sql.VarChar, family.ecRelation)
          .input("ecAddress", sql.VarChar, family.ecAddress)
          .input("ecPostCode", sql.VarChar, family.ecPostCode)
          .input("ecMobile", sql.VarChar, family.ecMobile)
          .input("Notes", sql.VarChar, family.notes)
          .execute("UpdateFamily");
        resolve("Family successfully updated");
      } catch (err) {
        reject("Error updating family: " + err.message);
      }
    });
  }
}

module.exports = Family;
