const express = require("express");
const router = express.Router();

const query = require("../../global/query");
const response = require("../../global/response");

/**
 * post: /api/schedules/update
 *
 * Updates an existing schedule
 *
 * *Required
 * @param name (string) Name of the new schedule
 * @param type (int) The schedule type
 * @param description (string) OPTIONAL description of what the schedule is for
 *
 * *Optional
 * @param time (datetime) OPTIONAL Time of the schedule, defaults to n/a
 * @param schedule_id (int) The id fo the schedule to update
 *
 * *Return
 * @schedule Schedule object that was just updated
 */
router.post("/update", (req, res) => {
  try {
    let db = new query();
    var rows;

    let name = req.body.name;
    let description = req.body.description;
    let type = req.body.type;
    let time = req.body.time;
    let schedule_id = req.body.schedule_id;

    if (isEmpty(name) || isEmpty(type) || isEmpty(schedule_id)) {
      return res.send(
        new response(
          "Some of the required fields were not provided correctly",
          false,
          `name: ${name} description: ${description} type: ${type} time: ${time} schedule_id: ${schedule_id}`
        ).body
      );
    } else {
      let sql =
        "update schedules set name = ?, description = ?, type = ?, time = ? where id = ?";
      let p = [name, description, type, time, schedule_id];

      db.query(sql, p, true)
        .then(() => {
          sql =
            "select s.id as id, s.name as name, s.description as description, s.time as time, et.name as type, et.description as type_description, s.creator as creator_id from schedules s left join event_types et on s.type = et.id where s.id = ?";
          p = [schedule_id];

          return db.query(sql, p, false);
        })
        .then((result) => {
          rows = result;
          return db.end();
        })
        .then(
          () => {
            let r = new response("The schedule was successfully updated").body;
            r.body.schedule = rows[0];
            return res.send(r);
          },
          (err) => {
            console.log("There was an error updating the schedule");
            console.log(err.message);
            return res.send(
              new response(
                "There was an error updating the schedule",
                false,
                err.message
              )
            );
          }
        );
    }
  } catch (err) {
    return res.send(
      new response(
        "There was an error updating the schedule",
        false,
        err.message
      )
    );
  }
});

/**
 * post: /api/schedules/create
 *
 * Creates a new schedule
 *
 * @param name (string) Name of the new schedule
 * @param type (int) The schedule type
 * @param description (string) OPTIONAL description of what the schedule is for
 * @param time (datetime) OPTIONAL Time of the schedule, defaults to n/a
 */
router.post("/create", (req, res) => {
  try {
    let db = new query();
    var rows;

    let name = req.body.name;
    let description = req.body.description;
    let type = req.body.type;
    let time = req.body.time;
    let creator_id = req.session.user.id;

    if (isEmpty(name) || isEmpty(type) || isEmpty(creator_id)) {
      return res.send(
        new response(
          "Some of the required fields were not provided correctly",
          false,
          `name: ${name} type: ${type}`
        ).body
      );
    } else {
      let sql = "select * from schedules where name = ?";
      let p = name;

      db.query(sql, p, false)
        .then((result) => {
          if (result.length > 0) {
            return Promise.reject({
              message: "A schedule with this name already exists",
            });
          } else {
            sql =
              "insert into schedules (name, description, type, time, creator) values (?, ?, ?, ?, ?)";
            p = [name, description, type, time, creator_id];
            return db.query(sql, p, true);
          }
        })
        .then(() => {
          sql =
            "select * from schedules where name = ? and type = ? and creator = ?";
          p = [name, type, creator_id];

          return db.query(sql, p, false);
        })
        .then((result) => {
          rows = result;
          return db.end();
        })
        .then(
          () => {
            let r = new response("The schedule was successfully created.").body;
            r.body.schedule = rows[0];
            return res.send(r);
          },
          (err) => {
            return res.send(
              new response(
                "There was an error creating the schedule",
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
        "There was an error creating the schedule",
        false,
        err.message
      ).body
    );
  }
});

/**
 * post: /api/schedules/delete
 *
 * Deletes a specified schedule from the database
 *
 * @param schedule_id Distinctive id of the schedule to be deleted
 */
router.post("/delete", (req, res) => {
  try {
    let db = new query();

    let id = req.body.schedule_id;

    if (isEmpty(id)) {
      return res.send(
        new response(
          "The required parameters were not provided correctly",
          false,
          `schedule_id: ${id}`
        ).body
      );
    } else {
      let sql = "delete from schedules where id = ?";
      let p = [id];

      db.query(sql, p, true)
        .then(() => {
          return db.end();
        })
        .then(
          () => {
            return res.send(
              new response(`Deleting id: ${id} was successful`).body
            );
          },
          (err) => {
            return res.send(
              new response(
                "There was an error deleting the provided schedule",
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
        "There was an error deleting the provided schedule",
        false,
        err.message
      ).body
    );
  }
});

/**
 * get: /api/schedules
 *
 * Gets all of the schedules within the database
 *
 * @params none needed for this route
 */
router.get("/", (req, res) => {
  try {
    let db = new query();
    var rows;

    let sql =
      "select s.id as id, s.name as name, s.description as description, s.time as time, et.name as type, et.description as type_description from schedules s left join event_types et on s.type = et.id";
    let p = [];

    db.query(sql, p, false)
      .then((result) => {
        rows = result;
        return db.end();
      })
      .then(
        () => {
          let r = new response(
            "Successfully pulled all the schedles from the database"
          ).body;
          r.body.schedules = rows;
          return res.send(r);
        },
        (err) => {
          return res.send(
            new response(
              "Error while pulling schedules from the database",
              false,
              err.message
            ).body
          );
        }
      );
  } catch (err) {
    return res.send(
      new response(
        "Error while pulling schedules from the database",
        false,
        err.message
      ).body
    );
  }
});

/**
 * get: /api/schedules/:id
 *
 * Gets a specific schedule
 *
 * @param id This is id of the schedule to be returned. Append the id to the end of the route
 */
router.get("/:id", (req, res) => {
  try {
    let db = new query();
    var rows;

    let schedule_id = req.params.id;

    let sql =
      "select s.id as id, s.name as name, s.description as description, s.time as time, et.name as type, et.description as type_description, s.creator as creator_id from schedules s left join event_types et on s.type = et.id where s.id = ?";
    let p = [schedule_id];

    db.query(sql, p, false)
      .then((result) => {
        rows = result;
        return db.end();
      })
      .then(
        () => {
          let r = new response(
            "Successfully retrieved the schedule from the database"
          ).body;
          r.body.schedules = rows[0];
          return res.send(r);
        },
        (err) => {
          return res.send(
            new response(
              "Error while pulling the schedule from the database",
              false,
              err.message
            ).body
          );
        }
      );
  } catch (err) {
    return res.send(
      new response(
        "There was an error while pulling the schedule from the database",
        false,
        err.message
      )
    );
  }
});

function isEmpty(str) {
  return str === undefined || str === null || str === "";
}

module.exports = router;
