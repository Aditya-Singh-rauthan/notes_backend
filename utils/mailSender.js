// const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

// dotenv.config({ path: "config/.env" });

const email = process.env.EMAIL;
const emailPassword = process.env.EMAIL_PASSWORD;

const mailSender = async ({
  email: receiverEmail,
  content: { otp },
  callback,
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
    subject: "Authentication Required For myBlog.com",
    // text:otp,
    html: `
    <h4>OTP for verification</h4>
    <p>${otp}</p>
    `,
  };

  return transporter.sendMail(mailOptions, callback);
};

module.exports = {
  mailSender,
};
