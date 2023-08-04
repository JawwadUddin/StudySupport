const express = require("express");
const cors = require("cors");
const sql = require("mssql");
const { dbConnect } = require("./db");
const server = express();
const bcrypt = require("bcrypt");
const { success, error } = require("./helper/responseApi");
const jwt = require("jsonwebtoken");
const secretKey = "your_secret_key";

server.use(cors());
server.use(express.json());

const familyRoutes = require("./routes/family");
const studentRoutes = require("./routes/student");
const relationRoutes = require("./routes/relation");
const schoolRoutes = require("./routes/school");
const testRoutes = require("./routes/test");
const questionRoutes = require("./routes/question");
const topicRoutes = require("./routes/topic");
const syllabusRoutes = require("./routes/syllabus");
const scoreRoutes = require("./routes/score");
const registerRoutes = require("./routes/register");
const sessionDateRoutes = require("./routes/sessionDate");
const compensationRoutes = require("./routes/compensation");
const invoiceRoutes = require("./routes/invoice");
const paymentRoutes = require("./routes/payment");
const customerRoutes = require("./routes/customer");

server.use("/api/family", familyRoutes);
server.use("/api/student", studentRoutes);
server.use("/api/relation", relationRoutes);
server.use("/api/school", schoolRoutes);
server.use("/api/test", testRoutes);
server.use("/api/question", questionRoutes);
server.use("/api/topic", topicRoutes);
server.use("/api/syllabus", syllabusRoutes);
server.use("/api/score", scoreRoutes);
server.use("/api/register", registerRoutes);
server.use("/api/sessionDate", sessionDateRoutes);
server.use("/api/compensations", compensationRoutes);
server.use("/api/invoice", invoiceRoutes);
server.use("/api/payment", paymentRoutes);
server.use("/api/customer", customerRoutes);

server.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to the backend server for Study Support" });
});

// server.post("/register", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // Generate a salt and hash the password
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     console.log(hashedPassword);

//     res.status(200).json({ message: "Registration successful" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "An error occurred" });
//   }
// });

server.post("/login", async (req, res) => {
  const { username, password } = req.body.data;

  try {
    const pool = await dbConnect();
    const userData = await pool
      .request()
      .input("Username", sql.VarChar, username)
      .output("HashedPassword", sql.VarChar)
      .execute("Login");
    const hashedPassword = userData.output.HashedPassword;
    if (!hashedPassword) {
      // If the user is not found, return an error response
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);

    if (isPasswordValid) {
      const token = jwt.sign({ username }, secretKey);

      // If the password matches, authentication is successful
      res.status(200).json(success("OK", { data: token }, res.statusCode));
    } else {
      // If the password does not match, return an error response
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = server;
