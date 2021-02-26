var express = require("express");
var router = express.Router();

const query = require("../global/query");

router.post("/new_order", (req, res) => {
  let time = req.body.time;
  let products = req.body.products;
  let price = req.body.price;

  if (isEmpty(time) || isEmpty(products) || isEmpty(price)) {
    return res.send({
      valid: false,
      body: {
        message: "There was an error creating the account.",
        error: "One of the fields was blank",
      },
    });
  } else {
    let sql = "insert into orders (time, products, price) values (?, ?, ?)";
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
