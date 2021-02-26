var express = require("express");
var router = express.Router();

const query = require("../global/query");

router.post("/done", (req, res) => {
  let id = req.body.id;

  if (id === undefined || id === null) {
    return res.send({
      valid: false,
      body: {
        message: "There was not a valid id provided",
        error: "invalid_id",
      },
    });
  } else {
    let sql = "update orders set completed = 1 where id = ?";
    let p = [id];

    query(sql, p, true, false).then(
      () => {
        return res.send({
          valid: true,
          body: {
            message: "Successfully updated your order.",
          },
        });
      },
      (err) => {
        return res.send({
          valid: false,
          body: {
            message: "There was an error updating the order. Please try again.",
            error: err.message,
          },
        });
      }
    );
  }
});

router.post("/new_order", (req, res) => {
  let time = req.body.time;
  let products = req.body.products;
  let price = req.body.price;
  let priority = req.body.priority;
  let car_description = req.body.car_description;
  let additional_instructions = req.body.additional_instructions;

  if (
    isEmpty(time) ||
    isEmpty(products) ||
    isEmpty(price) ||
    isEmpty(priority) ||
    isEmpty(car_description) ||
    isEmpty(additional_instructions)
  ) {
    return res.send({
      valid: false,
      body: {
        message: "There was an error creating the account.",
        error: "One of the fields was blank",
      },
    });
  } else {
    let sql =
      "insert into orders (time, products, price, priority, car_description, additional_instructions) values (?, ?, ?, ?, ?, ?)";
    let p = [time, products, price];

    query(sql, p, true, false).then(
      () => {
        return res.send({
          valid: true,
          body: {
            message: "Successfully created your order.",
          },
        });
      },
      (err) => {
        return res.send({
          valid: false,
          body: {
            message: "There was an error creating the order. Please try again.",
            error: err.message,
          },
        });
      }
    );
  }
});

router.get("/all", (req, res) => {
  let sql = "select * from orders where completed = 0";

  query(sql, [], false, false).then(
    (rows) => {
      let data = [];

      for (let row of rows) {
        data.push({
          id: row.id,
          time: row.time,
          products: row.products,
          price: row.price,
          priority: row.priority,
          car_description: row.car_description,
          additional_instructions: row.additional_instructions,
        });
      }
      return res.send({
        valid: true,
        body: {
          message: "All the current orders that are not done.",
          orders: data,
        },
      });
    },
    (err) => {
      return res.send({
        valid: false,
        body: {
          message: "There was an error creating the order. Please try again.",
          error: err.message,
        },
      });
    }
  );
});

function isEmpty(str) {
  return str === null || str === undefuned || str === "";
}

module.exports = router;
