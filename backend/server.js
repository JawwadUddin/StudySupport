const express = require("express");
const cors = require("cors");

const server = express();

server.use(cors());
server.use(express.json());

const familyRoutes = require("./routes/family");
const studentRoutes = require("./routes/student");
const relationRoutes = require("./routes/relation");
const schoolRoutes = require("./routes/school");

server.use("/api/family", familyRoutes);
server.use("/api/student", studentRoutes);
server.use("/api/relation", relationRoutes);
server.use("/api/school", schoolRoutes);

server.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to the backend server for Study Support" });
});

module.exports = server;
