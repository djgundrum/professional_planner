var express = require("express");
var router = express.Router();

let account_router = require("./account/account");
let admin_router = require("./admin/admin");
let order_router = require("./order/order");
let menu_router = require("./menu/menu");
let staff_router = require("./staff/staff");
let cart_router = require("./cart/cart");
let product_router = require("./product/product");

router.use("/account", account_router);
router.use("/admin", admin_router);
router.use("/order", order_router);
router.use("/menu", menu_router);
router.use("/staff", staff_router);
router.use("/cart", cart_router);
router.use("/product", product_router);

module.exports = router;
