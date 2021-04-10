const express = require("express");
const router = express.Router();

const query = require("../../global/query");
const response = require("../../global/response");
const bcrypt = require("bcrypt");

/**
 * get: /api/preferences
 *
 * Gets all the preferences
 *
 * @params none needed for this route
 */
router.get("/", (req, res) => {
  try {
    let db = new query();
    var rows;

    let sql = "select * from preference_types";
    let p = [];

    db.query(sql, p, false)
      .then((result) => {
        rows = result;
        return db.end();
      })
      .then(
        () => {
          let r = new response(
            "Successfully pulled all the preferences from the database"
          ).body;
          r.body.preferences = rows;
          return res.send(r);
        },
        (err) => {
          return res.send(
            new response(
              "Error while pulling preferences from the database",
              false,
              err.message
            ).body
          );
        }
      );
  } catch (err) {
    return res.send(
      new response("Unable to retrieve preferences", false, err.message).body
    );
  }
});

/**
 * get: /api/preferences/category
 *
 * Gets all preference categories
 *
 * @params none needed for this route
 */
router.get("/category", (req, res) => {
  try {
    let db = new query();
    var rows;

    let sql = "select category from preference_types group by category";
    let p = [];

    db.query(sql, p, false)
      .then((result) => {
        rows = result;
        return db.end();
      })
      .then(
        () => {
          let r = new response(
            "Successfully retrieved the categories from the database"
          ).body;
          r.body.category = rows;
          return res.send(r);
        },
        (err) => {
          return res.send(
            new response(
              "Error while pulling the categories from the database",
              false,
              err.message
            ).body
          );
        }
      );
  } catch (err) {
    return res.send(
      new response(
        "There was an error while pulling the categories from the database",
        false,
        err.message
      )
    );
  }
});

/**
 * post: /api/preferences/create
 *
 * Creates a specified preference and stores in the database
 *
 * @param category (string) Type of preference being created
 * @param name (string) The name of preference being created
 * @param description (string) OPTIONAL description of what the preference is for
 */
router.post("/create", (req, res) => {
  try {
    let db = new query();

    let category = req.body.category;
    let description = req.body.description;
    let name = req.body.name;

    if (isEmpty(description) || isEmpty(category) || isEmpty(name)) {
      return res.send(
        new response(
          "Some of the required fields were not provided correctly",
          false,
          `category: ${category} name: ${name}`
        ).body
      );
    } else {
      let sql =
        "insert into preference_types (category, description, name) values (?, ?, ?);";
      let p = [category, description, name];

      db.query(sql, p, true)
        .then(() => {
          return db.end();
        })
        .then(
          () => {
            return res.send(
              new response("The preference was successfully created").body
            );
          },
          (err) => {
            return res.send(
              new response(
                "There was an error creating the preference",
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
        "There was an error creating the preference",
        false,
        err.message
      ).body
    );
  }
});

/**
 * post: /api/preferences/delete
 *
 * Deletes a specified preference from the database
 *
 * @param preference_id Distinctive id of the preference to be deleted
 */
router.post("/delete", (req, res) => {
  try {
    let db = new query();

    let id = req.body.preference_id;

    if (isEmpty(id)) {
      return res.send(
        new response(
          "The required parameters were not provided correctly",
          false,
          `preference_id: ${id}`
        ).body
      );
    } else {
      let sql = "delete from preference_types where id = ?";
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
                "There was an error deleting the preference with provided id",
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
        "There was an error deleting the provided preference",
        false,
        err.message
      ).body
    );
  }
});

module.exports = router;
