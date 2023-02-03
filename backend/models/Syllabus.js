const sql = require("mssql");
const { dbConnect } = require("../db");

class Syllabus {
  constructor(data) {
    this.id = data.syllabus_id;
    this.syllabusName = data.syllabus_name;
    this.topicID = data.topic_id;
    this.topicName = data.topic_name;
    this.mock = data.mock;
    this.testID = data.test_id;
    this.testName = data.test_name;
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

  static findTopicsByID(id) {
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

  static findTestsByID(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const testData = await pool
          .request()
          .input("SyllabusID", sql.Int, id)
          .execute("SelectTestsBySyllabus");
        const tests = testData.recordset.map((d) => new Syllabus(d));
        resolve(tests);
      } catch (err) {
        reject(err);
      }
    });
  }

  static create(syllabus) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const syllabusData = await pool
          .request()
          .input("SyllabusName", sql.VarChar, syllabus.syllabusName)
          .input("JsonTopics", sql.VarChar, JSON.stringify(syllabus.topics))
          .output("SyllabusID", sql.Int)
          .execute("InsertSyllabus");
        const newSyllabus = syllabusData.output.SyllabusID;
        resolve({ newSyllabusID: newSyllabus });
      } catch (err) {
        reject("Error creating Test: " + err.message);
      }
    });
  }
}

module.exports = Syllabus;
