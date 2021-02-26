var express = require("express");
var router = express.Router();

const query = require("../global/query");

router.get("/get_product/:id", (req, res) => {
  let id = req.params.id;

  if (id === undefined || id === null) {
    return res.send({
      valid: false,
      body: {
        message: "The id provided is not a valid id",
      },
    });
  } else {
    let sql = "select * from products where id = ?";
    let p = [id];

    query(sql, p, false, false).then(
      (rows) => {
        let row = rows[0];
        let data = {
          id: row.id,
          name: row.name,
          description: row.description,
          photo_url: row.photo_url,
          section: row.section,
          price: row.price,
          available: row.available,
        };

        return res.send({ valid: true, body: { product: data } });
      },
      (err) => {
        return res.send({
          valid: false,
          body: {
            message:
              "There was an error getting the product. Please try again.",
            error: err.message,
          },
        });
      }
    );
  }
});

module.exports = router;
