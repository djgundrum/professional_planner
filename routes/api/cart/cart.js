var express = require("express");
var router = express.Router();

const query = require("../global/query");

router.get("/all", (req, res) => {
  try {
    //let id = req.session.user.id;
    let id = 1

    if (id === undefined || id === null) {
      return res.send({
        valid: false,
        body: {
          message: "The session id was not defined, the user must login",
        },
      });
    } else {
      let sql = "select * from cart where user_id = ?";
      let p = [id];

      query(sql, p, false, false).then(
        (rows) => {
          let data = [];

          for (let row of rows) {
            data.push({
              id: row.id,
              user_id: row.user_idtime,
              product_id: row.product_id,
              quantity: row.quantity,
              price: row.price,
            });
          }
          return res.send({
            valid: true,
            body: {
              message: "These are all the items in the cart.",
              cart: data,
            },
          });
        },
        (err) => {
          return res.send({
            valid: false,
            body: {
              message:
                "There was an error getting the items in the cart. Please try again.",
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
        message: "There was an error processing the user information.",
        error: err.message,
      },
    });
  }
});

module.exports = router;
