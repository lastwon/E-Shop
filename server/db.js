import mysql from "mysql";

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "45.84.207.0",
  user: "u748648148_eshop",
  password: "Testing123",
  database: "u748648148_eshop",
});

export default pool;
