//const pool = require("./connection");
const mysql = require("mysql");

class db {
  constructor() {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      host: "45.82.72.223",
      user: "declan",
      password: "Anyvipw1-",
      database: "planner",
    });
  }

  query(sql, p, empty) {
    console.log("This is the query about to run: ");
    console.log(sql);
    console.log(p);
    return new Promise((resolve, reject) => {
      if (empty) {
        this.pool.query(sql, p, (err) => {
          if (err) {
            console.log(err.message);
            reject(err);
          } else {
            resolve(true);
          }
        });
      } else {
        this.pool.query(sql, p, (err, rows) => {
          if (err) {
            console.log(err.message);
            reject(err);
          } else {
            resolve(rows);
          }
        });
      }
    });
  }

  end() {
    return new Promise((resolve, reject) => {
      this.pool.end((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}

module.exports = db;
