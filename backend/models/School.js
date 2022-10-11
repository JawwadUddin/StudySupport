const sql = require("mssql");
const { dbConnect } = require("../db");

class School {
  constructor(data) {
    this.id = data.school_id;
    this.schoolName = data.school_name;
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const schoolData = await pool.request().execute("SelectAllSchools");
        const schools = schoolData.recordset.map((d) => new School(d));
        resolve(schools);
      } catch (err) {
        reject(err);
      }
    });
  }

  static create(school) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const schoolData = await pool
          .request()
          .input("School", sql.VarChar, school)
          .execute("InsertSchool");
        resolve("Successfully created new school");
      } catch (err) {
        reject("Error creating school: " + err.message);
      }
    });
  }

  static edit(id, school) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const schoolData = await pool
          .request()
          .input("SchoolID", sql.Int, id)
          .input("School", sql.VarChar, school)
          .execute("UpdateSchool");
        resolve("School successfully updated");
      } catch (err) {
        reject("Error updating school: " + err.message);
      }
    });
  }
}

module.exports = School;
