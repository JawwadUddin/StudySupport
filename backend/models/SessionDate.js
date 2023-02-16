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
        const sessionDatasData = await pool
          .request()
          .execute("SelectSessionDates");
        const sessionDates = sessionDatasData.recordset.map(
          (d) => new SessionDate(d)
        );
        resolve(sessionDates);
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = SessionDate;
