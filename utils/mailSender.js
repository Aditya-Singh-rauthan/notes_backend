require("dotenv").config();
const nodemailer = require("nodemailer");

// dotenv.config({ path: "config/.env" });

const email = process.env.EMAIL;
const emailPassword = process.env.EMAIL_PASSWORD;

const mailSender = async ({
  email: receiverEmail,
  content: { otp },
  callback,
  subject,
  html
}) => {
  otp = "" + otp;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: emailPassword,
    },
  });

  let mailOptions = {
    from: email,
    to: receiverEmail,
    subject,
    // text:otp,
    html,
  };

  return transporter.sendMail(mailOptions, callback);
};

module.exports = {
  mailSender,
};
