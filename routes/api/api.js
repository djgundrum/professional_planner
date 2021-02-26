var express = require("express");
var router = express.Router();

let account_router = require("./account/account");
let admin_router = require("./admin/admin");
let cart_router = require("./cart/cart");
let menu_router = require("./menu/menu");
let staff_router = require("./staff/staff");

router.use("/account", account_router);
router.use("/admin", admin_router);
router.use("/cart", cart_router);
router.use("/menu", menu_router);
router.use("/staff", staff_router);

module.exports = router;
