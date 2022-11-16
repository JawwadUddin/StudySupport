const sql = require("mssql");
const { dbConnect } = require("../db");

class TestComment {
  constructor(data) {
    this.id = data.test_comment_id;
    this.comment = data.comment;
  }

  static studentTestComment(studentID, testID) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const testCommentData = await pool
          .request()
          .input("StudentID", sql.Int, studentID)
          .input("TestID", sql.Int, testID)
          .execute("SelectStudentTestComment");
        const testComment = testCommentData.recordset.map(
          (d) => new TestComment(d)
        )[0];
        resolve(testComment);
      } catch (err) {
        reject(err);
      }
    });
  }

  static create(testComment) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const testCommentData = await pool
          .request()
          .input("StudentID", sql.Int, testComment.studentID)
          .input("TestID", sql.Int, testComment.testID)
          .input("Comment", sql.VarChar, testComment.comment)
          .execute("InsertStudentTestComment");
        resolve("Successfully created new comment");
      } catch (err) {
        reject("Error creating test comment: " + err.message);
      }
    });
  }

  static edit(id, comment) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const testCommentData = await pool
          .request()
          .input("TestCommentID", sql.Int, id)
          .input("Comment", sql.VarChar, comment)
          .execute("UpdateStudentTestComment");
        resolve("Test comment successfully updated");
      } catch (err) {
        reject("Error updating test comment: " + err.message);
      }
    });
  }
}

module.exports = TestComment;
