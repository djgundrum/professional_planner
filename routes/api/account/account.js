var express = require("express");
var router = express.Router();

let query = require("../global/query");
let user = require("../global/user");

router.get("/validate", (req, res) => {
  if (req.sesssion && req.session.user) {
    return res.send({ valid: true, body: { user: req.session.user } });
  } else {
    return res.send({ valid: false, body: { user: null } });
  }
});

router.post("/logout", (req, res) => {
  query("", [], true, true).then(
    () => {
      return res.send({
        valid: true,
        body: { message: "Successfully logged out the user" },
      });
    },
    (err) => {
      return res.send({
        valid: false,
        body: {
          message:
            "There was an error logging out the account. Please try again.",
          error: err.message,
        },
      });
    }
  );
});

router.post("/update", (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let phone = req.body.phone;
  let address = req.body.address;
  let role = req.body.role;
  let id = req.session.user.id;

  if (
    isEmpty(name) ||
    isEmpty(email) ||
    isEmpty(password) ||
    id === undefined
  ) {
    return res.send({
      valid: false,
      body: {
        message: "There was an error updating the account.",
        error: "One of the fields was blank",
      },
    });
  } else {
    let sql =
      "update users set name = ?, email = ?, phone = ?, role = ?, password = ?, address = ? where id = ?";
    let p = [name, email, phone, role, password, address, id];

    query(sql, p, true, false).then(
      () => {
        return res.send({
          valid: true,
          body: { message: "Successfully updated the account" },
        });
      },
      (err) => {
        return res.send({
          valid: false,
          body: {
            message:
              "There was an error updating the account. Please refresh and try again.",
            error: err.message,
          },
        });
      }
    );
  }
});

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
        if (result.length === 0) {
          return res.send({
            valid: false,
            body: { message: "Wrong credentials." },
          });
        } else {
          let row = result[0];
          req.session.user = new user(
            row.id,
            row.name,
            row.email,
            row.password,
            row.phone,
            row.address,
            row.role
          );

          return res.send({ valid: true, body: { user: req.session.user } });
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
  return str === null || str === undefined || str === "";
}

module.exports = router;
