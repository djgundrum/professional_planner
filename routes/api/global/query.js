const pool = require("./connection");

const query = async (sql, p, empty, end) => {
  console.log("Entering query function, this is the query to be executed");
  console.log(sql);
  console.log(p);

  return new Promise((resolve, reject) => {
    if (end) {
      pool.end();
      resolve();
    } else if (empty) {
      pool.query(sql, p, (err) => {
        if (err) {
          console.log(err.message);
          reject(err);
        } else {
          resolve(true);
        }
      });
    } else {
      pool.query(sql, p, (err, rows) => {
        if (err) {
          console.log(err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    }
  });
};

module.exports = query;
