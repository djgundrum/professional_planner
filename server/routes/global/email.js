var nodemailer = require("nodemailer");

class Email {
  constructor(config) {
    if (config === undefined || config === null) {
      this.emailer = nodemailer.createTransport({
        host: "smtp.flockmail.com",
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: "info@storylinq.com",
          pass: "Anyvipw1-",
        },
      });
    } else {
      this.emailer = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: false,
        auth: config.auth,
      });
    }
  }

  email_html(to, from, subject, html) {
    return new Promise((resolve, reject) => {
      console.log("Starting emailer");

      let email = { to: to, from: from, subject: subject, html: html };
      console.log(email);

      this.emailer.sendMail(email, (err, message) => {
        if (err) {
          console.log(err.message);
          reject(err);
        } else resolve(message);
      });
    });
  }

  end() {
    return new Promise((resolve, reject) => {
      try {
        this.emailer.close();
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = Email;
