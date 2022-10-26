const sql = require("mssql");
const { dbConnect } = require("../db");

class Student {
  constructor(data) {
    this.id = data.student_id;
    this.familyID = data.family_id;
    this.fullName = data.full_name;
    this.DOB = data.DOB;
    this.schoolYear = data.school_year;
    this.school = data.school_name;
    this.mobile = data.mobile;
    this.medicalInfo = data.medical_info;
    this.notes = data.notes;
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const studentData = await pool.request().execute("SelectAllStudents");
        const students = studentData.recordset.map((d) => new Student(d));
        resolve(students);
      } catch (err) {
        reject(err);
      }
    });
  }

  static findByID(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const studentData = await pool
          .request()
          .input("StudentID", sql.Int, id)
          .execute("SelectStudentByID");
        const student = studentData.recordset.map((d) => new Student(d))[0];
        resolve(student);
      } catch (err) {
        reject(err);
      }
    });
  }

  static findByIDAndDelete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const studentData = await pool
          .request()
          .input("StudentID", sql.Int, id)
          .execute("DeleteStudentByID");
        resolve("Student successfully deleted");
      } catch (err) {
        reject(err);
      }
    });
  }

  static create(student) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const studentData = await pool
          .request()
          .input("FamilyID", sql.Int, student.familyID)
          .input("FullName", sql.VarChar, student.fullName)
          .input("DOB", sql.VarChar, student.DOB)
          .input("SchoolYear", sql.Int, student.schoolYear)
          .input("School", sql.VarChar, student.school)
          .input("MedicalInfo", sql.VarChar, student.medicalInfo)
          .input("Notes", sql.VarChar, student.notes)
          .output("StudentID", sql.Int)
          .execute("InsertStudent");
        const newStudent = studentData.output.StudentID;
        resolve({ newStudentID: newStudent });
      } catch (err) {
        reject("Error creating student: " + err.message);
      }
    });
  }

  static edit(id, student) {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await dbConnect();
        const studentData = await pool
          .request()
          .input("StudentID", sql.Int, id)
          .input("FamilyID", sql.Int, student.familyID)
          .input("FullName", sql.VarChar, student.fullName)
          .input("DOB", sql.VarChar, student.DOB)
          .input("SchoolYear", sql.Int, student.schoolYear)
          .input("School", sql.VarChar, student.school)
          .input("MedicalInfo", sql.VarChar, student.medicalInfo)
          .input("Notes", sql.VarChar, student.notes)
          .execute("UpdateStudent");
        resolve("Student successfully updated");
      } catch (err) {
        reject("Error updating student: " + err.message);
      }
    });
  }
}

module.exports = Student;
