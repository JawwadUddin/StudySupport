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

  static edit(changes) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const registerData = await pool
          .request()
          .input("JsonAdd", sql.VarChar, JSON.stringify(changes.add))
          .input("JsonUpdate", sql.VarChar, JSON.stringify(changes.update))
          .input("JsonRemove", sql.VarChar, JSON.stringify(changes.remove))
          .execute("UpdateRegister");
        resolve("Register successfully updated");
      } catch (err) {
        reject("Error updating register: " + err.message);
      }
    });
  }
}

module.exports = Register;
