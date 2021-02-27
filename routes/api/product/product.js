var express = require("express");
var router = express.Router();

const query = require("../global/query");

router.post("/update", (req, res) => {
  let name = req.body.name;
  let description = req.body.description;
  let photo_url = req.body.photo_url;
  let section = req.body.section;
  let price = req.body.price;
  let available = req.body.available;
  let id = req.body.id;

  if (
    isEmpty(name) ||
    isEmpty(price) ||
    isEmpty(description) ||
    isEmpty(photo_url) ||
    isEmpty(section) ||
    isEmpty(available)
  ) {
    return res.send({
      valid: false,
      body: {
        message: "Need fields name, description, photo_url, section, and price",
      },
    });
  } else {
    let sql =
      "update products set name = ?, price = ?, description = ?, photo_url = ?, section = ?, available = ? where id = ?";
    let p = [name, price, description, photo_url, section, available, id];

    query(sql, p, true, false).then(
      () => {
        return res.send({
          valid: true,
          body: {
            message: "Successfully updated the product",
          },
        });
      },
      (err) => {
        return res.send({
          valid: false,
          body: {
            message:
              "There was an error updating the product. Please try again.",
            error: err.message,
          },
        });
      }
    );
  }
});

router.post("/new", (req, res) => {
  let name = req.body.name;
  let description = req.body.description;
  let photo_url = req.body.photo_url;
  let section = req.body.section;
  let price = req.body.price;
  let available = req.body.available;

  if (
    isEmpty(name) ||
    isEmpty(price) ||
    isEmpty(description) ||
    isEmpty(photo_url) ||
    isEmpty(section) ||
    isEmpty(available)
  ) {
    return res.send({
      valid: false,
      body: {
        message: "Need fields name, description, photo_url, section, and price",
      },
    });
  } else {
    let sql =
      "insert into products (name, description, photo_url, section, price, available) values (?, ?, ?, ?, ?, ?)";
    let p = [name, description, photo_url, section, price, available];

    query(sql, p, true, false).then(
      () => {
        return res.send({
          valid: true,
          body: {
            message: "Successfully created a new product",
          },
        });
      },
      (err) => {
        return res.send({
          valid: false,
          body: {
            message:
              "There was an error creating the product. Please try again.",
            error: err.message,
          },
        });
      }
    );
  }
});

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

function isEmpty(str) {
  return str === null || str === undefined || str === "";
}

module.exports = router;
