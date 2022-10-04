const sql = require("mssql");
const getConfig = require("./config/db.config");

const config =
  process.env.NODE_ENV === "production"
    ? getConfig().production
    : getConfig().development;

let retries = 0;

function dbConnect() {
  return sql
    .connect(config)
    .then((pool) => {
      retries = 0;
      return pool;
    })
    .catch((err) => {
      if (err.code === "ETIMEOUT" && retries < 5) {
        setTimeout(function () {
          retries++;
          console.log(`Attempt ${retries}: retrying the connection...`);
          dbConnect();
        }, 5000);
      } else {
        console.log("Failed to connect to database:", err);
      }
    });
}

module.exports = {
  dbConnect,
};
