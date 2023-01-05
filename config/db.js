const mysql = require("mysql");
const { v4: uuidV4 } = require("uuid");

let db;
connectDatabase = () => {
  if (!db) {
    db = mysql.createConnection({
      host: process.env.DBHOST,
      user: process.env.DBUSER,
      database: process.env.DBNAME,
      password: process.env.DBPASSWORD,
    });
    db.connect(function (err) {
      if (!err) {
        console.log("Database is connected!");
        const query = `CREATE DATABASE IF NOT EXISTS ${process.env.DBNAME}
        `;
        db.query(query, function (err, result) {
          if (err) {
            console.log(err);
          }
          console.log("New database created");
          console.log(result);
        });
      } else {
        console.log("Error connecting database!", err);
      }
    });
  }
  return db;
};
module.exports = connectDatabase();
