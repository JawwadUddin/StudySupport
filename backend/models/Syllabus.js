const sql = require("mssql");
const { dbConnect } = require("../db");

class Syllabus {
  constructor(data) {
    this.id = data.syllabus_id;
    this.syllabusName = data.syllabus_name;
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const syllabusData = await pool
          .request()
          .execute("SelectAllSyllabuses");
        const syllabuses = syllabusData.recordset.map((d) => new Syllabus(d));
        resolve(syllabuses);
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = Syllabus;
