var express = require("express");
var router = express.Router();
const session = require("express-session");

// This holds all the functions for stripe calls
const stripers = require("./setup");
var stripe = new stripers();

// This holds all the classes needed for database activities
const databaser = require("./database");
var database = new databaser();

// Routes for signin page
var signin = require("./pages/signin");
router.use("/signin", signin);

// Routes for signup page
var signup = require("./pages/signup");
router.use("/signup", signup);

var create = require("./pages/create");
router.use("/create", create);

router.post("/signout", (req, res) => {
  try {
    req.session.destroy();
    res.send(true);
  } catch (err) {
    res.send("Couldn't sign out");
    console.log(err);
  }
});

router.post("/unsubscribe", async (req, res) => {
  if (!req.session.user.stripe_id) {
    res.send({
      valid: false,
      message:
        "There was an error unsubscribing you, please try again or cantact info@storylinq.com",
    });
    return;
  } else if (!req.session.user.email) {
    res.send({
      valid: false,
      message:
        "There was an error unsubscribing you, please try again or cantact info@storylinq.com",
    });
    return;
  }

  let stripe_id = req.session.user.stripe_id;
  let email = req.session.user.email;

  // Calls stripe function to take care of the rest

  let first = await database.unsubscribe(email);
  if (first == false) return;

  let second = await stripe.unsubscribe(stripe_id, email, req, res);
  if (second == false) return;

  res.send({ valid: true });
});

router.post("/getUserInformation", (req, res) => {
  if (!req.session.user.stripe_id) {
    res.send({
      valid: false,
      message: "Could not get user details because of authentication error.",
    });
  }

  stripe.getUserDetails(req.session.user.stripe, req, res);
});

router.post("/getSection", (req, res) => {
  if (!req.session.user.email)
    res.send({
      valid: false,
      message: "User authentification failed, please try again",
    });

  let id = req.session.user.user_id;
  let section = req.body.section;

  database.getSections(id, section, req, res);
});

router.post("/saveSection", (req, res) => {
  if (!req.session.user.user_id) {
    res.send({
      valid: false,
      message:
        "There was an issue authenticating this account. No information was stored, please try again.",
    });
  }

  try {
    let data = {
      sectionid: req.body.sectionid,
      user_id: req.session.user.user_id,
      title: req.body.title,
      content: req.body.content,
    };

    database.saveSection(data, req, res);
  } catch (err) {
    res.send({
      valid: false,
      message:
        "There was an error communicating to our server, please try again.",
    });
  }
});

router.get("/validate", (req, res) => {
  if (req.session.user) {
    res.send({ valid: true, message: req.session.user });
  } else {
    res.send({
      valid: false,
      message:
        "There was an error authenticating to our server, please close this tab and try logging in again.",
    });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy();

  res.send({ valid: true, message: "/" });
});

router.post("/createCustomer", function (req, res) {
  if (
    !req.session.email ||
    !req.session.password ||
    !req.session.sessionid ||
    !req.session.first_name ||
    !req.session.last_name
  ) {
    database.email(
      "Creating Customer Problem",
      "The session wasn't valid so nothing was created"
    );
  } else {
    let email = req.session.email;
    let password = req.session.password;
    let sessionid = req.session.sessionid;
    let name = req.session.first_name + " " + req.session.last_name;

    if (req.session.update && req.session.update == true) {
      database.updateUser({
        Email: email,
        Password: password,
        stripeCustomerId: sessionid,
        Paid: 1,
      });
    }

    database.createUser(sessionid, email);
  }
});

router.post("/changePassword", (req, res) => {
  try {
    let password = req.body.password;
    let email = req.session.user.email;

    database.changePassword(email, password, res);
  } catch (err) {
    console.log("This is an error from updating password");
    console.log(err);

    res.send({
      valid: false,
      message:
        "There was an error updating your password, please try again later.",
    });
  }
});

router.post("/updateCustomer", (req, res) => {
  let data = {};
  if (req.body.Paid) data["Paid"] = req.body.Paid;
  if (req.body.Email) data["Email"] = req.body.Email;
  if (req.body.Password) data["Password"] = req.body.Password;
  if (req.body.stripeCustomerId)
    data["stripeCustomerId"] = req.body.stripeCustomerId;

  database.updateUser(data);
});

router.post("/help", (req, res) => {
  let subject = req.body.subject;
  let message = req.body.message;
  let userEmail = req.session.user.email;

  if (subject == "" || message == "") {
    res.send({
      valid: false,
      message: "There was an error processing your request, please try again",
    });
  } else {
    database.help(subject, message, userEmail, res);
  }
});

router.post("/sendDocument", (req, res) => {
  if (!req.body || !req.body.text) {
    res.send({
      valid: false,
      message:
        "There was a problem sending your script, please contact info@storylinq.com for assistance or try again.",
    });
  }

  let text = req.body.text;

  if (text == null || text == "") {
    res.send({
      valid: false,
      message:
        "There was no content selected from your account. Please select content to send.",
    });
    return;
  }

  let email = req.session.user.email;

  let message = `Email: ${email} \n\n ${text}`;
  let to = "declan.gundrum.17@gmail.com";
  let subject = "New Script Submitted for Pat";

  try {
    database.emailTo(subject, message, to);
    res.send({ valid: true });
  } catch (err) {
    res.send({
      valid: false,
      message:
        "There was a problem processing your request, please contact info@storylinq.com for assistance or try again.",
    });
  }
});

router.post("/callPat", (req, res) => {
  let email = req.session.user.email;
  let message = `Email: ${email}\n\nThis user is using their lifeline. Try to get back to them soon about setting up a time to do so.`;
  let subject = "New user using call pat lifeline";
  let to = "declan.gundrum.17@gmail.com";

  try {
    database.emailTo(subject, message, to);
    res.send({ valid: true });
  } catch (err) {
    res.send({
      valid: false,
      message:
        "There was a problem processing your request, please contact info@storylinq.com for assistance or try again.",
    });
  }
});

router.post("/mass/email", (req, res) => {
  let email = req.body.email;
  let message = req.body.message;
  let subject = req.body.subject;

  try {
    database.emailTo(subject, message, email);
    res.send(`The email was sent awesomely! ${email}`);
  } catch (err) {
    res.send(`The email to ${email} was not sent correctly`);
  }
});

module.exports = router;
