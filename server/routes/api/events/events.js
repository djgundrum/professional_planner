const express = require("express");
const router = express.Router();

const query = require("../../global/query");
const response = require("../../global/response");

router.get("/", (req, res) => {
  try {
    let db = new query();
    var rows;

    let sql =
      "select s.id as id, s.name as name, s.description as description, s.time as time, et.name as type, et.description as type_description from schedules s inner join event_types et on s.type = et.id";
    let p = [];

    db.query(sql, p, false)
      .then((result) => {
        rows = result;
        db.end();
      })
      .then(
        () => {
          return res.send(
            new response(
              "Successfully pulled all the schedules from the database"
            ).body
          );
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

router.get("/:id", (req, res) => {});

module.exports = router;
