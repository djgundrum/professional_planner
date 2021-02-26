var express = require("express");
var router = express.Router();

var query = require("../global/query");

router.get("/all", (req, res) => {
  let sql = "select * from products";

  query(sql, [], false, false).then(
    (rows) => {
      let data = [];

      for (let row of rows) {
        data.push({
          id: row.id,
          name: row.name,
          description: row.description,
          photo_url: row.photo_url,
          section: row.section,
          price: row.price,
          available: row.available,
        });
      }

      return res.send({
        valid: true,
        body: { message: "These are all the current products", data: data },
      });
    },
    (err) => {
      return res.send({
        valid: false,
        body: {
          message:
            "There was an error getting all the products. Please try again.",
          error: err.message,
        },
      });
    }
  );
});

module.exports = router;
