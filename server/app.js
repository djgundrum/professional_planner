var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var api_router = require("./routes/api/api");
var session = require("express-session");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(__dirname + "/../build"));
app.set("views", __dirname + "/../build");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(session({ secret: "schedule_planner" }));

app.use("/", indexRouter);
app.use("/api", api_router);

module.exports = app;
