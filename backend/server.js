const express = require("express");
const cors = require("cors");

const server = express();

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

server.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to the backend server for Study Support" });
});

module.exports = server;
