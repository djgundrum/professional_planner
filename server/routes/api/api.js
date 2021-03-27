var express = require("express");
var router = express.Router();

const user_router = require("./user/user");
const roles_router = require("./roles/roles");
const events_router = require("./events/events");
const schedules_router = require("./schedules/schedules");
const shifts_router = require("./shifts/shifts");

router.use("/user", user_router);
router.use("/roles", roles_router);
router.use("/events", events_router);
router.use("/schedules", schedules_router);
router.use("/shifts", shifts_router);

module.exports = router;
