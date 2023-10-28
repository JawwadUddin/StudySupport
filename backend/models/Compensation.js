const sql = require("mssql");
const { dbConnect } = require("../db");

class Compensation {
  constructor(data) {
    this.studentSessionID = data.student_session_id;
    this.studentID = data.student_id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.schoolYear = data.schoolYear;
    this.sessionDate = data.session_date;
    this.sessionTime = data.session_time;
  }

  static find(sessionDateID) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const compensationData = await pool
          .request()
          .input("RegisterDateID", sql.Int, sessionDateID)
          .execute("SelectCompensationAllowedSessions");
        const compensations = compensationData.recordset.map(
          (d) => new Compensation(d)
        );
        resolve(compensations);
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = Compensation;
