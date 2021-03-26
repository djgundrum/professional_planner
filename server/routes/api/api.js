var express = require("express");
var router = express.Router();

const user_router = require("./user/user");

router.use("/user", user_router);

module.exports = router;
