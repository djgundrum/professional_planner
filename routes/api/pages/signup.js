let express = require("express");
let router = express.Router();

/* const stripe = require("stripe")(
  "sk_test_51I6MBOHgzzCFwnpHmS194kgQ0uahSHFhlJdHBjk3brQqX8Z9jDVVcPpzsuh7RXP5RzcefjNWeJNnPG4HS55c8I9000CmSf3S4j"
); // This is the test key */

const stripe = require("stripe")(
  "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"
); // This is the live key

const connection = require("../connection");
const connectioner = new connection();

var conn = connectioner.connect();

router.post("/", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let discount = req.body.discount;
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  discount = discount.toLowerCase();

  signupCheck(email, password, discount, first_name, last_name, req, res);
});

function signupCheck(
  email,
  password,
  discount,
  first_name,
  last_name,
  req,
  res
) {
  let sql = `SELECT * FROM users WHERE email = ?`;
  let p = [email];
  console.log("This is the email");
  console.log(email);

  conn.query(sql, p, (err, rows, fields) => {
    console.log("There was something gong on here");
    console.log(rows);
    if (err) {
      conn.release();
      console.log(err.message);
      return res.send({
        valid: false,
        message:
          "Something went wrong communicating to our database, please try again",
      });
    } else if (rows.length > 0 && rows[0].paid == "TRUE") {
      return res.send({
        valid: false,
        message: "This email is already signed up.",
      });
    } else {
      // Sets the global user data
      req.session.email = email;
      req.session.password = password;
      req.session.first_name = first_name;
      req.session.last_name = last_name;

      let full_name = first_name + " " + last_name;

      let trial = true;

      let sql =
        "insert into users (email, password, paid, name) values (?, ?, 'TRUE', ?)";
      let p = [email, password, full_name];

      conn.query(sql, p, (err, rows, fields) => {
        if (err) {
          console.log(err);
          conn.release();
          return res.send({ valid: true, message: err.message });
        }
      });

      return res.send({
        valid: true,
        message: "It worked great but will not actually be doing anything now",
      });

      var plan;
      // For future reference, if you add a new plan, just add it here and it won't break anything
      if (discount === "pilot") plan = "price_1IFsF1HgzzCFwnpHCGIY7XQH";
      else plan = "price_1I6MEHHgzzCFwnpH9e9HZv7e";

      // Uncomment this in test mode
      /* if (discount === "feedback") plan = "price_1IBrsfHgzzCFwnpH9Ku9bypU";
      else plan = "price_1I6MDRHgzzCFwnpHI19rX4hA"; */

      //TEST
      //plan = "plan_HIwqBGMhBOR3AJ"; // This is the test plan, uncomment this if ever testing

      createSession(plan, trial, req, res);
    }
  });
}

async function createSession(plan, trial, req, res) {
  console.log("These are the parameters");
  console.log(plan);
  console.log(trial);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: plan,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: "http://scholarlinq.com/subscriptionsuccess",
      cancel_url: "http://scholarlinq.com/",
      //TEST
      //success_url: "http://localhost:8080/subscriptionsuccess",
      //cancel_url: "http://localhost:8080/",
      subscription_data: { trial_from_plan: trial },
    });

    console.log("This is the session that was returned");
    console.log(session);

    req.session.sessionid = session.id;

    return res.send({
      valid: true,
      id: session.id,
    });
  } catch (err) {
    console.log(err);
    return res.send({
      valid: false,
      message: "Something went wrong when setting up the stripe session",
    });
  }
}

module.exports = router;
