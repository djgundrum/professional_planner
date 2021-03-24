const pool = require("./connection");

const query = (sql, p, empty, end) => {
  if (end) {
    pool.end();
    return;
  } else if (empty) {
    pool.query(sql, p, (err) => {
      if (err) {
        console.log(err.message);
        return false;
      } else {
        return true;
      }
    });
  } else {
    pool.query(sql, p, (err, rows) => {
      if (err) {
        console.log(err.message);
        return false;
      } else {
        return rows;
      }
    });
  }
};

module.exports = query;
