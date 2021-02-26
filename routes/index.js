var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index");
});

router.get("/admin", (req, res) => {
  res.render("admin.html");
});

router.get("/cart", (req, res) => {
  res.render("cart.html");
});

router.get("/menu", (req, res) => {
  res.render("menu.html");
});

router.get("/staff", (req, res) => {
  res.render("staff.html");
});

router.get("/account", (req, res) => {
  res.render("account.html");
});

module.exports = router;
