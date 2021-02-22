var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  try {
    /* let connectioner = new connection();
    req.session.conn = connectioner.connect(); */
    res.render("index.html", { title: "Express" });
  } catch (err) {
    console.log("Error in index.js backend");
    console.log(err);
  }
});

module.exports = router;
