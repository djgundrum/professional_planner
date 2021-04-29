const express = require("express");
const router = express.Router();

const query = require("../../global/query");
const response = require("../../global/response");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const emailer = require("../../global/email");

/**
 * get: /api/user/email/:email
 *
 * Will get a user based on their email address
 *
 * *Required
 * email (string) Email address of the user
 */
router.get("/email/:email", (req, res) => {
  try {
    let db = new query();
    var rows;

    let email = req.params.email;

    if (isEmpty(email)) {
      return res.send(
        new response(
          "The provided email address was not valid",
          false,
          `email: ${email}`
        ).body
      );
    } else {
      let sql = "select * from users where email = ?";
      let p = [email];

      db.query(sql, p, false)
        .then((result) => {
          rows = result;
          return db.end();
        })
        .then(
          () => {
            if (rows.length === 0)
              return res.send(
                new response(
                  "There are no users with that email address",
                  false
                ).body
              );
            else {
              let r = new response("Successfully got the user").body;
              r.body.user = rows[0];

              return res.send(r);
            }
          },
          (err) => {
            console.log(err);
            throw { message: err.message };
          }
        );
    }
  } catch (err) {
    return res.send(
      new response("Error in returning the user", false, err.message).body
    );
  }
});

/**
 * get: /api/user/id/:id
 *
 * Will get a user based on their id
 *
 * *Required
 * id (int) id of the user
 */
router.get("/id/:id", (req, res) => {
  try {
    let db = new query();
    var rows;

    let id = req.params.id;

    if (isEmpty(id)) {
      return res.send(
        new response("The provided id was not valid", false, `id: ${id}`).body
      );
    } else {
      let sql = "select id, name, email from users where id = ?";
      let p = [id];

      db.query(sql, p, false)
        .then((result) => {
          rows = result;
          return db.end();
        })
        .then(
          () => {
            if (rows.length === 0)
              return res.send(
                new response("There are no users with that id", false).body
              );
            else {
              let r = new response("Successfully got the user").body;
              r.body.user = rows[0];

              return res.send(r);
            }
          },
          (err) => {
            console.log(err);
            throw { message: err.message };
          }
        );
    }
  } catch (err) {
    return res.send(
      new response("Error in returning the user", false, err.message).body
    );
  }
});

/**
 * post: /api/user/forgot_password
 *
 * Will generate and save a hashed token for the user to reset their password with. Then will send them an email with the link to the reset password page.
 *
 * *Required
 * @param email (string) The email the user used to sign up with
 */
router.post("/forgot_password", (req, res) => {
  try {
    let db = new query();
    let emaile = new emailer();

    let user_email = req.body.email;

    if (isEmpty(user_email)) {
      throw { message: `Provided email was not valid. email: ${user_email}` };
    } else {
      let hash = crypto.randomBytes(50).toString("hex");

      let sql = "update users set password_reset = ? where email = ?;";
      let p = [hash, user_email];

      db.query(sql, p, true)
        .then(() => {
          return db.end();
        })
        .then(() => {
          let test = `http://localhost:3000/forgot_password/${hash}`;
          let live = `https://whatever.com/forgot_password/${hash}`;

          let html = `
						<h3>Click the link to reset your password</h3>
						<a href="${test}" target="_blank">Reset Password</a>
						`;

          return emaile.email_html(
            user_email,
            "info@storylinq.com",
            "Reset Your Password",
            html
          );
        })
        .then(() => {
          return emaile.end();
        })
        .then(
          () => {
            return res.send(
              new response("Successfully set reset password and sent email")
                .body
            );
          },
          (err) => {
            throw { message: err.message };
          }
        );
    }
  } catch (err) {
    return res.send(
      new response("Error in forgot password functionality", false, err.message)
        .body
    );
  }
});

/**
 * post: /api/user/forgot_password_update
 *
 * After going to the reset password page, call this function with their hash and send in thier new password
 *
 * *Required
 * @param hash (string) The hash that the user had generated for them
 * @param password (string) The new password the user provided
 */
router.post("/forgot_password_update", (req, res) => {
  try {
    let db = new query();
    let rounds = 10;

    let hash = req.body.hash;
    let password = req.body.password;

    if (isEmpty(hash) || isEmpty(password)) {
      return res.send(
        new response(
          `The provided parameters were not valid`,
          false,
          `hash: ${hash}, password: ${password}`
        ).body
      );
    } else {
      generate_hash(password, rounds)
        .then((result) => {
          let sql = "update users set password = ? where password_reset = ?";
          let p = [result, hash];

          return db.query(sql, p, true);
        })
        .then(() => {
          return db.end();
        })
        .then(
          () => {
            return res.send(
              new response("The password was updated successfully").body
            );
          },
          (err) => {
            throw { message: err.message };
          }
        );
    }
  } catch (err) {
    return res.send(
      new response(
        "Error updating the password for the user",
        false,
        err.message
      ).body
    );
  }
});

/**
 * post: /api/user/logout
 *
 * Will logout the current user
 *
 * @params no parameters needed for this route
 */
router.post("/logout", (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) throw { message: err.message };
      else {
        return res.send(new response("Successfully logged out the user.").body);
      }
    });
  } catch (err) {
    return res.send(
      new response(
        "There was an error logging out the current user.",
        false,
        err.message
      ).body
    );
  }
});

/**
 * post: /api/user/update_preference
 *
 * Will update the preference that is specified
 *
 * @param category (string) of the category group
 * @param preference_id (int) id of the preference they want
 */
router.post("/update_preference", (req, res) => {
  try {
    let db = new query();

    let category = req.body.category;
    let preference_id = req.body.preference_id;
    let user_id = req.session.user.id;

    if (isEmpty(category) || isEmpty(user_id) || isEmpty(preference_id)) {
      return res.send(
        new response(
          "Some of the required parameters were not provided correctly",
          false,
          `category: ${category}, user_id: ${user_id}, preference_id: ${preference_id}`
        ).body
      );
    } else {
      let sql =
        "update user_preferences set preference_id = ? where user_id = ? and category = ?";
      let p = [preference_id, user_id, category];

      db.query(sql, p, true)
        .then(() => {
          db.end();
        })
        .then(
          () => {
            return res.send(
              new response("The preference was updated successfully").body
            );
          },
          (err) => {
            console.log("There was an error updating the preference");
            console.log(err.message);
            return res.send(
              new response(
                "There was an error updating the preference",
                false,
                err.message
              ).body
            );
          }
        );
    }
  } catch (err) {
    return res.send(
      new response(
        "There was an error updating the preference",
        false,
        err.message
      ).body
    );
  }
});

/**
 * post: /api/user/update_user
 *
 * Will update the user with new information.
 * Will need all the the old information still even if it isn't being updated
 *
 * @param name (string) what their updated name will be
 * @param email (string) updated email
 * @param password (string) new password (will be rehashed if same old password)
 * @param role (int) id of their new role
 */
router.post("/update_user", (req, res) => {
  try {
    let db = new query();
    var rows;

    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    if (isEmpty(password)) {
      password = "empty";
    }
    let role = req.body.role;
    let id = req.session.user.id;
    let rounds = 10;

    if (isEmpty(name) || isEmpty(email) || isEmpty(role) || isEmpty(id)) {
      let r = new response(
        "Some of the parameters are not valid",
        false,
        `name: ${name}, email: ${email}, password: ${password}, role: ${role}, id: ${id}`
      );
      return res.send(r.body);
    } else {
      generate_hash(password, rounds)
        .then((hash) => {
          var sql;
          var p;
          if (isEmpty(req.body.password)) {
            sql = "update users set name = ?, email = ?, role = ? where id = ?";
            p = [name, email, role, id];
          } else {
            sql =
              "update users set name = ?, email = ?, password = ?, role = ? where id = ?";
            p = [name, email, hash, role, id];
          }

          return db.query(sql, p, true);
        })
        .then(() => {
          db.end();
        })
        .then(
          () => {
            req.session.user.name = name;
            req.session.user.email = email;
            return res.send(
              new response("The user was updated successfully.").body
            );
          },
          (err) => {
            return res.send(
              new response(
                "There was an error updating the user.",
                false,
                err.message
              ).body
            );
          }
        );
    }
  } catch (err) {
    return res.send(
      new response("There was an error updating the user.", false, err.message)
        .body
    );
  }
});

/**
 * post: /api/user/login
 *
 * Will check to see if there is a user in the database and return if they have logged in successfully
 *
 * @param email (string) email from the form
 * @param password (string) password from the form
 */
router.post("/login", (req, res) => {
  try {
    let db = new query();
    var rows;

    let email = req.body.email;
    let password = req.body.password;

    if (isEmpty(password) || isEmpty(email)) {
      return new response(
        "Some of the required fields were not set properly",
        false,
        `email: ${email} password: ${password}`
      ).body;
    } else {
      let sql = "select * from users where email = ?";
      let p = [email];

      db.query(sql, p, false)
        .then((results) => {
          rows = results;
          db.end();
        })
        .then(() => {
          if (rows.length === 0) {
            return res.send(
              new response("There are no users with that email address.", false)
                .body
            );
          } else {
            let user = rows[0];

            bcrypt.compare(password, user.password, (err, same) => {
              if (err)
                return res.send(
                  new response(
                    "There was an error logging in the user.",
                    false,
                    err.message
                  ).body
                );
              if (same) {
                req.session.user = {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  password: user.password,
                  role: user.role,
                  joined: user.joined,
                };

                let r = new response("The user was successfully logged in")
                  .body;
                r.body.user = rows[0];
                return res.send(r);
              } else
                return res.send(
                  new response("The password provided was incorrect", false)
                    .body
                );
            });
          }
        });
    }
  } catch (err) {
    console.log("There was an error logging in the user");
    console.log(err.message);
    return res.send(
      new response(
        "There was an error logging in the user.",
        false,
        err.message
      ).body
    );
  }
});

/**
 * post: /api/user/create_user
 *
 * Will create a new user with given information
 *
 * @param name (string) what their updated name will be
 * @param email (string) updated email
 * @param password (string) new password (will be rehashed if same old password)
 * @param role (int) id of their new role
 */
router.post("/create_user", (req, res) => {
  try {
    let db = new query();
    var rows;

    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let role = req.body.role;

    // This is the amount of times a string will be hashed to create a secure salt
    let rounds = 10;

    if (isEmpty(email) || isEmpty(password)) {
      let r = new response(
        "Some of the parameters are not valid",
        false,
        `name: ${name}, email: ${email}, password: ${password}, role: ${role}`
      );
      return res.send(r.body);
    } else {
      let sql = "select * from users where email = ?";
      let p = [email];

      db.query(sql, p, false)
        .then((result) => {
          rows = result;

          return generate_hash(password, rounds);
        })
        .then((hash) => {
          if (rows.length > 0)
            throw { message: "There is already a user with this email" };
          else {
            let sql =
              "insert into users (name, email, password, role) values (?, ?, ?, ?)";
            let p = [name, email, hash, role];

            return db.query(sql, p, true);
          }
        })
        .then(() => {
          db.end();
        })
        .then(
          () => {
            return res.send(
              new response("The user was successfully added").body
            );
          },
          (err) => {
            console.log("Error in creating a new user");
            console.log(err.message);
            return res.send(
              new response(
                "There was an error creating the new user",
                false,
                err.message
              )
            );
          }
        );
    }
  } catch (err) {
    console.log("there was an error creating the new user");
    console.log(err.message);
    return res.send(
      new response(
        "There was an error creating the new user",
        false,
        err.message
      ).body
    );
  }
});

/**
 * post: /api/user/delete
 *
 * Deletes a specified user
 *
 * @param user_id int id of the user to be deleted
 * @param email (string) email of the user to be deleted
 */
router.post("/delete", (req, res) => {
  try {
    let db = new query();
    let user_id = req.body.user_id;
    let email = req.body.email;

    if (isEmpty(user_id) && isEmpty(email)) {
      let r = new response(
        "The user was not specified correctly",
        false,
        `user_id: ${user_id}, email: ${email}`
      );
      return res.send(r.body);
    } else {
      let sql = "delete from users where id = ? or email = ?";
      let p = [user_id, email];

      db.query(sql, p, true)
        .then(() => {
          db.end();
        })
        .then(
          () => {
            return res.send(
              new response("The user was successfully delted").body
            );
          },
          (err) => {
            return res.send(
              new response(
                "There was an error deleting the user.",
                false,
                err.message
              ).body
            );
          }
        );
    }
  } catch (err) {
    return res.send(
      new response("There was an error deleting the user.", false, err.message)
        .body
    );
  }
});

/**
 * get: /api/user/validate
 *
 * Will return if the current user is validated or not
 *
 * @params no parameters are needed for this
 */
router.get("/validate", (req, res) => {
  try {
    if (req.session.user.id === undefined) {
      let r = new response(
        "User not valid",
        false,
        `session user: ${req.session.user}`
      );

      return res.send(r.body);
    } else {
      return res.send(new response("User is validated").body);
    }
  } catch (err) {
    return res.send(new response("User not valid", false, err.message).body);
  }
});

/**
 * get: /api/user/account
 *
 * Will return all the information about the user including preferences
 *
 * @params none needed for this route
 */
router.get("/account", (req, res) => {
  try {
    let db = new query();
    var rows;

    let user = req.session.user;

    if (isEmpty(user)) {
      let r = new response(
        `The user is not currently available`,
        false,
        `user session object: ${user}`
      );

      return res.send(r.body);
    } else {
      let sql =
        "select pt.id, pt.category, pt.description, pt.name from user_preferences up inner join preference_types pt on pt.id = up.preference_id where up.user_id = ?";
      let p = [user.id];

      db.query(sql, p, false)
        .then((result) => {
          rows = result;
          return db.end();
        })
        .then(
          () => {
            let preferences = [];
            for (let preference of rows) {
              preferences.push({
                category: preference.category,
                description: preference.description,
                name: preference.name,
              });
            }

            let r = new response("User object successfully loaded").body;
            r.body.user = { user: user, preferences: rows };

            return res.send(r);
          },
          (err) => {
            let r = new response(
              "There was an error loading the users profile",
              false,
              err.message
            );
            return res.send(r.body);
          }
        );
    }
  } catch (err) {
    return res.send(
      new response(
        "There was an error in loading the user",
        false,
        err.messasge
      ).body
    );
  }
});

function isEmpty(str) {
  return str === undefined || str === null || str === "";
}

function generate_hash(password, rounds) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(rounds, (err, salt) => {
      if (err) return reject(err);
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) return reject(err);
        else return resolve(hash);
      });
    });
  });
}

module.exports = router;
