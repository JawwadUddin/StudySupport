const sql = require("mssql");
const { dbConnect } = require("../db");

class Register {
  constructor(data) {}

  static find(sessionDate) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const registerData = await pool
          .request()
          .input("SessionDate", sql.Date, sessionDate)
          .execute("SelectRegister");
        const register = Object.values(registerData.recordset[0])[0];
        if (register === "") {
          resolve(register);
        }
        resolve(JSON.parse(register));
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = Register;
