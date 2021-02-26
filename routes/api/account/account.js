var express = require("express");
var router = express.Router();

let query = require("../global/query");
let user = require("../global/user");

router.post("/signup", (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;

  if (isEmpty(name) || isEmpty(email) || isEmpty(password)) {
    return res.send({
      valid: false,
      body: {
        message: "There was an error creating the account.",
        error: "One of the fields was blank",
      },
    });
  } else {
    let sql =
      "insert into users (name, email, password, role) values (?, ?, ?, 'Customer')";
    let p = [name, email, password];

    query(sql, p, true, false).then(
      () => {
        return res.send({
          valid: true,
          body: { message: "Successfully created the account" },
        });
      },
      (err) => {
        return res.send({
          valid: false,
          body: {
            message:
              "There was an error creating the account. Please refresh and try again.",
            error: err.message,
          },
        });
      }
    );
  }
});

router.post("/signin", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (isEmpty(email) || isEmpty(password)) {
    return res.send({
      valid: false,
      body: {
        message: "There was an error creating the account.",
        error: "One of the fields was blank",
      },
    });
  } else {
    let sql = "select * from users where email = ? and password = ?";
    let p = [email, password];

    query(sql, p, false, false).then(
      (result) => {
        if (result.length > 0) {
          return res.send({
            valid: false,
            body: { message: "Wrong credentials." },
          });
        } else {
          let row = result[0];
          let user = (req.session.user = new user(
            row.id,
            row.name,
            row.email,
            row.password,
            row.phone,
            row.address,
            row.role
          ));

          return res.send({ valid: true, body: { user: user } });
        }
      },
      (err) => {
        return res.send({
          valid: false,
          body: {
            message:
              "There was an error signing in. Please refresh and try again.",
            error: err.message,
          },
        });
      }
    );
  }
});

function isEmpty(str) {
  return str === null || str === undefuned || str === "";
}

module.exports = router;
