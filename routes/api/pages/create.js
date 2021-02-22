let express = require("express");
let router = express.Router();

const connection = require("../connection");
const connectioner = new connection();

var conn = connectioner.connect();

router.post("/save", (req, res) => {
  try {
    let user = req.session.user.id;
    let section = req.body.sectionid;
    let title = req.body.title;
    let content = req.body.content;

    let sql =
      "delete from entries where user = ? and section = ? and title = ?;";
    let p = [user, section, title];

    conn.query(sql, p, (err) => {
      if (err) {
        conn.release();
        console.log(err);
        return res.send({
          valid: false,
          message: "There was an error saving the section, please try again",
        });
      } else {
        sql =
          "insert into entries (user, section, title, content) values (?,?,?,?);";
        p = [user, section, title, content];

        conn.query(sql, p, (err) => {
          if (err) {
            conn.release();
            return res.send(err.message);
          } else return res.send("That went well");
        });
      }
    });
  } catch (err) {
    console.log(err);
    return res.send({ valid: false, message: err.message });
  }
});

router.post("/signout", (req, res) => {
  try {
    req.session.destroy();
    return res.send(true);
  } catch (err) {
    return res.send("Couldn't sign out");
  }
});

router.post("/getAllSections", (req, res) => {
  try {
    let user = req.session.user.id;

    let sql = "select * from entries where user = ? order by section;";
    let p = [user];

    console.log(user);

    conn.query(sql, p, (err, rows, fields) => {
      if (err) {
        conn.release();
        return res.send(err.message);
      } else {
        console.log(rows);
        let data = [];

        for (let i = 0; i < rows.length; ++i) {
          let row = rows[i];
          console.log(row);

          data.push({
            section: row.section,
            title: row.title,
            content: row.content,
          });
        }
        return res.send({ valid: true, message: data });
      }
    });
  } catch (err) {
    return res.send({ valid: false, message: err.message });
  }
});

router.post("/get_section", (req, res) => {
  try {
    let section = req.body.section;
    let user = req.session.user.id;

    let sql =
      "select title, content from entries where section = ? and (user = ? or user = -1)";
    let p = [section, user];

    conn.query(sql, p, (err, rows) => {
      if (err) {
        conn.release();
        console.log(err);
        return res.send({ valid: false, message: err.message });
      } else {
        let data = [];

        for (let i = 0; i < rows.length; ++i) {
          let row = rows[i];
          console.log(row);

          data.push({
            section: row.section,
            title: row.title,
            content: row.content,
          });
        }

        return res.send({ valid: true, message: data });
      }
    });
  } catch (err) {
    console.log("Error in /api/create/get_section");
    console.log(err);
  }
});

module.exports = router;
