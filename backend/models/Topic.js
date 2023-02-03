const sql = require("mssql");
const { dbConnect } = require("../db");

class Topic {
  constructor(data) {
    this.topicID = data.topic_id;
    this.topicName = data.topic_name;
  }

  static create(topic) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const topicData = await pool
          .request()
          .input("TopicName", sql.VarChar, topic.topicName)
          .input("SyllabusID", sql.Int, topic.syllabusID)
          .execute("InsertTopic");
        resolve("Topic successfully created");
      } catch (err) {
        reject("Error creating Topic: " + err.message);
      }
    });
  }

  static findTopicsStudentTestedOn(studentID, syllabusID) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const topicData = await pool
          .request()
          .input("SyllabusID", sql.Int, syllabusID)
          .input("StudentID", sql.Int, studentID)
          .execute("SelectTopicsStudentTestedOn");
        const topics = topicData.recordset.map((d) => new Topic(d));
        resolve(topics);
      } catch (err) {
        reject(err);
      }
    });
  }

  static delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const topicData = await pool
          .request()
          .input("TopicID", sql.Int, id)
          .execute("DeleteTopicByID");
        resolve("Topic successfully deleted");
      } catch (err) {
        reject(err);
      }
    });
  }

  static edit(id, topic) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const topicData = await pool
          .request()
          .input("TopicID", sql.Int, id)
          .input("TopicName", sql.VarChar, topic.topicName)
          .execute("UpdateTopic");
        resolve("Topic successfully updated");
      } catch (err) {
        reject("Error updating topic: " + err.message);
      }
    });
  }
}

module.exports = Topic;
