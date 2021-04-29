const express = require("express");
const router = express.Router();

const query = require("../../../global/query");
const response = require("../../../global/response");

router.post("/add", (req, res) => {
  try {
    let db = new query();

    let user_id = req.body.user_id;
    let schedule_id = req.body.schedule_id;

    if (isEmpty(user_id) || isEmpty(schedule_id)) {
      return res.send(
        new response(
          "The provided parameters were not valid",
          false,
          `user_id: ${user_id}, schedule_id: ${schedule_id}`
        ).body
      );
    } else {
      let sql = "insert into guests (user_id, schedule_id) values (?, ?)";
      let p = [user_id, schedule_id];

      db.query(sql, p, true)
        .then(() => {
          return db.end();
        })
        .then(
          () => {
            return res.send(
              new response("The guest was successfully added").body
            );
          },
          (err) => {
            return res.send(
              new response(
                "There was an error adding the new guest",
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
        "There was an error adding the new guest",
        false,
        err.message
      ).body
    );
  }
});

router.post("/delete", (req, res) => {
  try {
    let db = new query();

    let user_id = req.body.user_id;
    let schedule_id = req.body.schedule_id;

    if (isEmpty(user_id) || isEmpty(schedule_id)) {
      return res.send(
        new response(
          "The parameters provided were not valid",
          false,
          `user_id: ${user_id}, schedule_id: ${schedule_id}`
        ).body
      );
    } else {
      let sql = "delete from guests where schedule_id = ? and user_id = ?";
      let p = [schedule_id, user_id];

      db.query(sql, p, true)
        .then(() => {
          return db.end();
        })
        .then(
          () => {
            return res.send(
              new response("Successfully deleted the user from the event").body
            );
          },
          (err) => {
            return res.send(
              new response(
                "There was an error deleting the user from the event",
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
        "There was an error deleting this guest from this event",
        false,
        err.message
      ).body
    );
  }
});

router.get("/:id", (req, res) => {
  try {
    let db = new query();
    var rows;

    let id = req.params.id;

    if (isEmpty(id)) {
      return res.send(
        new response(
          "event id was not provided correctly",
          false,
          `event_id: ${id}`
        ).body
      );
    } else {
      let sql = "select * from guests where event_id = ?";
      let p = [id];

      db.query(sql, p, false)
        .then((results) => {
          rows = results;
          return db.end();
        })
        .then(
          () => {
            let r = new response(
              "The guests for this event were successfully returned"
            ).body;
            r.body.guests = rows;

            return res.send(r);
          },
          (err) => {
            return res.send(
              new response(
                "There was an error getting the guest list for this event",
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
        "There was an error getting the guests for this event",
        false,
        err.message
      ).body
    );
  }
});

/**
 * get: /api/events/guests/user/:id
 *
 * Returns all of the guests that a certain user is a part of
 *
 * @param id (int) id of the user
 */
router.get("/user/:id", (req, res) => {
  try {
    let db = new query();
    var rows;

    let id = req.params.id;

    if (isEmpty(id)) {
      return res.send(
        new response(
          "user id was not provided correctly",
          false,
          `event_id: ${id}`
        ).body
      );
    } else {
      let sql = "select * from guests where user_id = ?";
      let p = [id];

      db.query(sql, p, false)
        .then((results) => {
          rows = results;
          return db.end();
        })
        .then(
          () => {
            let r = new response(
              "The guests for this user were successfully returned"
            ).body;
            r.body.guests = rows;

            return res.send(r);
          },
          (err) => {
            return res.send(
              new response(
                "There was an error getting the guest list for this user",
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
        "There was an error getting the guests for this user",
        false,
        err.message
      ).body
    );
  }
});

/**
 * get: /api/events/guests/schedule/:id
 *
 * Returns all of the guests that a certain user is a part of
 *
 * @param id (int) id of the user
 */
router.get("/schedule/:id", (req, res) => {
  try {
    let db = new query();
    var rows;

    let id = req.params.id;

    if (isEmpty(id)) {
      return res.send(
        new response(
          "schedule id was not provided correctly",
          false,
          `event_id: ${id}`
        ).body
      );
    } else {
      let sql = "select * from guests where schedule_id = ?";
      let p = [id];

      db.query(sql, p, false)
        .then((results) => {
          rows = results;
          return db.end();
        })
        .then(
          () => {
            let r = new response(
              "The guests for this user were successfully returned"
            ).body;
            r.body.guests = rows;

            return res.send(r);
          },
          (err) => {
            return res.send(
              new response(
                "There was an error getting the guest list for this user",
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
        "There was an error getting the guests for this user",
        false,
        err.message
      ).body
    );
  }
});

router.get("/", (req, res) => {
  try {
    let db = new query();
    var rows;

    let sql = "select * from guests";
    let p = [];

    db.query(sql, p, false)
      .then((results) => {
        rows = results;
        return db.end();
      })
      .then(
        () => {
          let r = new response("Successfully got all the guests").body;
          r.body.guests = rows;

          return res.send(r);
        },
        (err) => {
          return res.send(
            new response(
              "There was an error retrieving the guests",
              false,
              err.message
            ).body
          );
        }
      );
  } catch (err) {
    return res.send(
      new response(
        "There was an error getting all the guests",
        false,
        err.message
      ).body
    );
  }
});

function isEmpty(str) {
  return str === "" || str === undefined || str === null;
}

module.exports = router;
