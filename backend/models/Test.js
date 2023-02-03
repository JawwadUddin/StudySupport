const sql = require("mssql");
const { dbConnect } = require("../db");

class Test {
  constructor(data) {
    this.id = data.test_id;
    this.testName = data.test_name;
    this.syllabusID = data.syllabus_id;
    this.syllabusName = data.syllabus_name;
    this.questionID = data.question_id;
    this.topicID = data.topic_id;
    this.topicName = data.topic_name;
    this.difficulty = data.difficulty;
    this.marks = data.marks;
    this.marksReceived = data.marks_received;
    this.mock = data.mock;
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const testData = await pool.request().execute("SelectAllTests");
        const tests = testData.recordset.map((d) => new Test(d));
        resolve(tests);
      } catch (err) {
        reject(err);
      }
    });
  }

  static findByID(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const testData = await pool
          .request()
          .input("TestID", sql.Int, id)
          .execute("SelectQuestionsForTest");
        const test = testData.recordset.map((d) => new Test(d));
        resolve(test);
      } catch (err) {
        reject(err);
      }
    });
  }

  static findByIDAndDelete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const testData = await pool
          .request()
          .input("TestID", sql.Int, id)
          .execute("DeleteTestByID");
        resolve("Test successfully deleted");
      } catch (err) {
        reject(err);
      }
    });
  }

  static studentTestsCompleted(studentID) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const testData = await pool
          .request()
          .input("StudentID", sql.Int, studentID)
          .execute("SelectStudentTestsCompleted");
        const test = testData.recordset.map((d) => new Test(d));
        resolve(test);
      } catch (err) {
        reject(err);
      }
    });
  }
  static studentTestsCompletedForSyllabus(studentID, syllabusID) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const testData = await pool
          .request()
          .input("StudentID", sql.Int, studentID)
          .input("SyllabusID", sql.Int, syllabusID)
          .execute("SelectStudentTestsCompletedBySyllabusID");
        const test = testData.recordset.map((d) => new Test(d));
        resolve(test);
      } catch (err) {
        reject(err);
      }
    });
  }

  static create(test) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const testData = await pool
          .request()
          .input("TestName", sql.VarChar, test.testName)
          .input("Type", sql.Bit, test.type)
          .input("SyllabusID", sql.Int, test.syllabusID)
          .input("JsonQuestions", sql.VarChar, JSON.stringify(test.questions))
          .output("TestID", sql.Int)
          .execute("InsertTest");
        const newTest = testData.output.TestID;
        resolve({ newTestID: newTest });
      } catch (err) {
        reject("Error creating Test: " + err.message);
      }
    });
  }

  static edit(id, test) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const testData = await pool
          .request()
          .input("TestID", sql.Int, id)
          .input("TestName", sql.VarChar, test.testName)
          .input("JsonQuestions", sql.VarChar, JSON.stringify(test.questions))
          .execute("UpdateTest");
        resolve("Test successfully updated");
      } catch (err) {
        reject("Error updating student: " + err.message);
      }
    });
  }
}

module.exports = Test;
