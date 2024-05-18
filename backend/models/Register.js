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

  static create(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const registerData = await pool
          .request()
          .input("RegisterDate", sql.Date, data.registerDate)
          .input("TemplateID", sql.Int, data.templateID)
          .output("SessionDateID", sql.Int)
          .execute("InsertRegister");
        const newSessionDate = registerData.output.SessionDateID;
        resolve({ newSessionDateID: newSessionDate });
      } catch (err) {
        reject("Error creating Question: " + err.message);
      }
    });
  }

  static findByIDAndDelete(id) {
    console.log("deleting session id " + id);
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const studentData = await pool
          .request()
          .input("SessionDateID", sql.Int, id)
          .execute("DeleteRegisterByID");
        resolve("Register successfully deleted");
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = Register;
