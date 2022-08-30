const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "nav",
});

//0为成功
module.exports = db;
