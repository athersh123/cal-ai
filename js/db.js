import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ather@333s",
  database: "nutrivision",
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("MySQL Connected");
});

export default db;