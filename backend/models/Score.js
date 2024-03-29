const sql = require("mssql");
const { dbConnect } = require("../db");

class Score {
  constructor(data) {
    this.id = data.score_id;
    this.questionID = data.question_id;
    this.topicID = data.topic_id;
    this.testID = data.test_id;
    this.topicName = data.topic_name;
    this.difficulty = data.difficulty;
    this.marksReceived = data.marks_received;
    this.marks = data.marks;
  }

  static studentScore(studentID, testID) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const scoreData = await pool
          .request()
          .input("StudentID", sql.Int, studentID)
          .input("TestID", sql.Int, testID)
          .execute("SelectStudentScoresByTestID");
        const score = scoreData.recordset.map((d) => new Score(d));
        resolve(score);
      } catch (err) {
        reject(err);
      }
    });
  }

  static studentSyllabusScore(studentID, syllabusID) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const scoreData = await pool
          .request()
          .input("StudentID", sql.Int, studentID)
          .input("SyllabusID", sql.Int, syllabusID)
          .execute("SelectStudentScoresBySyllabusID");
        const score = scoreData.recordset.map((d) => new Score(d));
        resolve(score);
      } catch (err) {
        reject(err);
      }
    });
  }

  static create(score) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const scoreData = await pool
          .request()
          .input("StudentID", sql.Int, score.studentID)
          .input("TestDate", sql.Date, score.testDate)
          .input("JsonScores", sql.VarChar, JSON.stringify(score.scores))
          .execute("InsertStudentScores");
        resolve("Successfully added student scores");
      } catch (err) {
        reject("Error creating Test: " + err.message);
      }
    });
  }

  static edit(id, score) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const scoreData = await pool
          .request()
          .input("ScoreID", sql.Int, id)
          .input("MarksReceived", sql.Int, score.marksReceived)
          .execute("UpdateScore");
        resolve("Test successfully updated");
      } catch (err) {
        reject("Error updating student: " + err.message);
      }
    });
  }
}

module.exports = Score;
