// // import mysql from "mysql2";

// // const db = mysql.createConnection({
// //   // host: "localhost",
// //   // user: "root",
// //   // password: "ather@333s",

// //   database: "nutrivision",
// //   port: 3306
// // });

// import mysql from "mysql2";

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT || 3306
// });

// export default db;
// db.connect((err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log("MySQL Connected");
// });

// export default db;
import mysql from "mysql2";

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
});

db.connect((err) => {
  if (err) {
    console.error("MySQL Connection Error:", err);
    return;
  }
  console.log("MySQL Connected");
});

export default db;