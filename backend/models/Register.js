const sql = require("mssql");
const { dbConnect } = require("../db");

class Register {
  constructor(data) {}

  static find(sessionDateID) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const registerData = await pool
          .request()
          .input("SessionDateID", sql.Int, sessionDateID)
          .execute("SelectRegister");
        const register = registerData.recordset[0].register;
        resolve(JSON.parse(register));
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = Register;
