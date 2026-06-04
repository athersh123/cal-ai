// // // import mysql from "mysql2";

// // // const db = mysql.createConnection({
// // //   // host: "localhost",
// // //   // user: "root",
// // //   // password: "ather@333s",

// // //   database: "nutrivision",
// // //   port: 3306
// // // });

// // import mysql from "mysql2";

// // const db = mysql.createConnection({
// //   host: process.env.DB_HOST,
// //   user: process.env.DB_USER,
// //   password: process.env.DB_PASSWORD,
// //   database: process.env.DB_NAME,
// //   port: process.env.DB_PORT || 3306
// // });

// // export default db;
// // db.connect((err) => {
// //   if (err) {
// //     console.error(err);
// //     return;
// //   }
// //   console.log("MySQL Connected");
// // });

// // export default db;
// import dotenv from "dotenv";

// dotenv.config({
//   path: "../.env"
// });

// import mysql from "mysql2";
// console.log("HOST:", process.env.DB_HOST);
// console.log("USER:", process.env.DB_USER);
// console.log("DB:", process.env.DB_NAME);
// console.log("PORT:", process.env.DB_PORT);

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// db.connect((err) => {
//   if (err) {
//     console.error("DB Error:", err);
//     return;
//   }
//   console.log("MySQL Connected");
// });
// db.query("SELECT DATABASE() AS db", (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Connected to:", result);
//   }
// });

// export default db;
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import mysql from "mysql2";

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  ssl: {
    rejectUnauthorized: false
  },
  connectTimeout: 60000
});

db.connect((err) => {
  if (err) {
    console.error("DB Error:", err);
    return;
  }
  console.log("MySQL Connected");
});

export default db;