const mysql = require("mysql");

/* let pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "declan",
  password: "Anyvipw1-",
  database: "planner",
}); */

let pool = mysql.createPool({
  connectionLimit: 10,
  host: "45.82.72.223",
  user: "declan",
  password: "Anyvipw1-",
  database: "planner",
});

pool.on("error", (err) => {
  console.log("Error in replylinq connection pool");
  console.log(err);
});

module.exports = pool;
