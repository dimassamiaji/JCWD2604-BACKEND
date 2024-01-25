/** @format */

import mysql from "mysql2";

export default mysql.createPool({
  host: "localhost",
  user: "root",
  port: 3306, //default port 3306
  password: "password",
  database: "db_purwadhika",
});
