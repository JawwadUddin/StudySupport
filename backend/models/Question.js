const sql = require("mssql");
const { dbConnect } = require("../db");

class Question {
  static create(question) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const questionData = await pool
          .request()
          .input("TestID", sql.VarChar, question.testID)
          .input("TopicID", sql.Int, question.topicID)
          .input("Difficulty", sql.VarChar, question.difficulty)
          .input("Marks", sql.Int, question.marks)
          .execute("InsertQuestion");
        resolve("Question successfully created");
      } catch (err) {
        reject("Error creating Question: " + err.message);
      }
    });
  }
  static delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const questionData = await pool
          .request()
          .input("QuestionID", sql.Int, id)
          .execute("DeleteQuestionByID");
        resolve("Question successfully deleted");
      } catch (err) {
        reject(err);
      }
    });
  }

  static edit(id, question) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const QuestionData = await pool
          .request()
          .input("QuestionID", sql.Int, id)
          .input("TopicID", sql.Int, question.topicID)
          .input("Difficulty", sql.VarChar, question.difficulty)
          .input("Marks", sql.Int, question.marks)
          .execute("UpdateQuestion");
        resolve("Question successfully updated");
      } catch (err) {
        reject("Error updating student: " + err.message);
      }
    });
  }
}

module.exports = Question;
