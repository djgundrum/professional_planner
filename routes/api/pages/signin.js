let express = require("express");
let router = express.Router();

var User = require("../User");

const connection = require("../connection");
const connectioner = new connection();

var conn = connectioner.connect();

router.post("/", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  signin(email, password, req, res);
});

router.post("/password", (req, res) => {
  let email = req.body.email;

  passwordRecovery(email, res);
});

function signin(email, password, req, res) {
  /* if (email == "admin" && password == "admin") {
    res.send({ valid: true, url: "/admin" });
  } */

  console.log(email + " " + password);

  let sql = `SELECT * FROM users WHERE email = ? AND password = ?`;

  console.log(sql);
  let p = [email, password];
  var user;

  conn.query(sql, p, (err, rows, fields) => {
    if (err) {
      conn.release();
      console.log(err.message);
      return res.send({ valid: false, message: err.message });
    }

    console.log(rows);

    if (rows.length == 0) {
      return res.send({
        valid: false,
        message:
          "The email and password provided do not match anything in our database.",
      });
      return;
    }

    req.session.user = new User(
      rows[0].id,
      rows[0].name,
      rows[0].email,
      rows[0].password,
      rows[0].stripe
    );

    if (rows[0].paid == "FALSE") res.send({ valid: true, url: "/checkout" });
    else return res.send({ valid: true, url: "/create" });

    conn.end();
  });
}

function passwordRecovery(email, res) {
  let sql = "SELECT * FROM users WHERE Email = ?";
  let p = [email];

  try {
    conn.query(sql, p, (err, rows, fields) => {
      if (err) {
        conn.release();
        console.log("This is what is going wrong");
        return res.send({ valid: false, message: err.message });
      }

      if (rows.length !== 1 || rows[0] == undefined) {
        return res.send("This email does not exist in our database.");
      }

      var remail = {
        from: "info@storylinq.com",
        to: email,
        subject: "Story Linq Password",
        text: `The password for your StoryLinq account:\n\n${rows[0].Password}`,
      };

      emailer.sendMail(remail, (err, info) => {
        if (err) {
          console.log(err);
          return res.send(
            "Something went wrong when trying to send the email."
          );
        } else {
          return res.send("Email was sent successfully!");
        }
      });
    });
  } catch (err) {
    console.log("There was an error sending the email");
    return res.send("There was an error sending the email");
  }
}

module.exports = router;
