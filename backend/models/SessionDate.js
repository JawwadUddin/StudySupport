const sql = require("mssql");
const { dbConnect } = require("../db");

class SessionDate {
  constructor(data) {
    this.id = data.session_date_id;
    this.sessionDate = data.session_date;
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const sessionDatesData = await pool
          .request()
          .execute("SelectSessionDates");
        const sessionDates = sessionDatesData.recordset.map(
          (d) => new SessionDate(d)
        );
        resolve(sessionDates);
      } catch (err) {
        reject(err);
      }
    });
  }

  static create(registerDate) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const sessionDatesData = await pool
          .request()
          .input("RegisterDate", sql.Date, registerDate)
          .output("SessionDateID", sql.Int)
          .execute("InsertSessionDate");
        const newSessionDate = sessionDatesData.output.SessionDateID;
        resolve({ newSessionDateID: newSessionDate });
      } catch (err) {
        reject("Error creating new session date: " + err.message);
      }
    });
  }
}

module.exports = SessionDate;
