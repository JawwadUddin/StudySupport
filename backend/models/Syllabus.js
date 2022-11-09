const sql = require("mssql");
const { dbConnect } = require("../db");

class Syllabus {
  constructor(data) {
    this.id = data.syllabus_id;
    this.syllabusName = data.syllabus_name;
    this.topicID = data.topic_id;
    this.topicName = data.topic_name;
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

  static findByID(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const topicData = await pool
          .request()
          .input("SyllabusID", sql.Int, id)
          .execute("SelectTopicsBySyllabus");
        const topics = topicData.recordset.map((d) => new Syllabus(d));
        resolve(topics);
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = Syllabus;
