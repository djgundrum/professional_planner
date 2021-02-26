var express = require("express");
var router = express.Router();

const query = require("../global/query");

router.post("/new", (req, res) => {
  try {
    let id = req.body.id;
    let message = req.body.message;

    if (isEmpty(id) || isEmpty(message)) {
      return res.send({
        valid: false,
        body: {
          message: "There was an error retrieving the messages.",
          error: "The user is not signed in",
        },
      });
    } else {
      let sql = "insert into messages (user_id, message) values (?, ?)";
      let p = [id, message];

      query(sql, p, true, false).then(
        () => {
          return res.send({
            valid: true,
            body: {
              message: "Successfully sent the message.",
            },
          });
        },
        (err) => {
          return res.send({
            valid: false,
            body: {
              message:
                "There was an error sending the message. Please try again.",
              error: err.message,
            },
          });
        }
      );
    }
  } catch (err) {
    return res.send({
      valid: false,
      body: {
        message: "There was an error sending the message.",
        error: "err.message",
      },
    });
  }
});

router.get("/all", (req, res) => {
  try {
    let id = req.session.user.id;

    if (id === undefined || id === null) {
      return res.send({
        valid: false,
        body: {
          message: "There was an error retrieving the messages.",
          error: "The user is not signed in",
        },
      });
    } else {
      let sql = "select * from messages where user_id = ?";
      let p = [id];

      query(sql, p, false, false).then(
        (rows) => {
          let data = [];

          for (let row of rows) {
            data.push({
              id: row.id,
              user_id: row.user_idname,
              message: row.message,
            });
          }

          return res.send({
            valid: true,
            body: { message: "These are all the messages", data: data },
          });
        },
        (err) => {
          return res.send({
            valid: false,
            body: {
              message:
                "There was an error getting the messages. Please try again.",
              error: err.message,
            },
          });
        }
      );
    }
  } catch (err) {
    return res.send({
      valid: false,
      body: {
        message: "There was an error retrieving the messages.",
        error: "err.message",
      },
    });
  }
});

function isEmpty(str) {
  return str === null || str === undefined || str === "";
}

module.exports = router;
