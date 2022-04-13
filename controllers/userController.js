const User = require("../models/UserModel");
const Otp = require("../models/OtpModel");
const { mailSender } = require("../utils/mailSender");
const { mailSender: sendInBlue } = require("../utils/sendinblue");
const { otpGenerator, encryptPassword } = require("../utils/utilities");
const { jwtToken } = require("../utils/jwtValidation");

const saveOtpInDb = async (params) => {
  let { res, error, data, ...rest } = params || {};
  // console.log('>>>>data',error,data)
  if (error) {
    console.log(">>>error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
  try {
    let otpEntry = await Otp.create({ ...rest });
    if (otpEntry) {
      return res.status(200).json({ message: "Otp Sent Successfully!!!" });
    }
  } catch (e) {
    return res.status(400).json({ message: "Internal Server Error" });
  }
};

exports.otpSender = async (req, res) => {
  const { body: { email } = {} } = req || {};
  let userAlreadyExists = false;
  let otpAlreadySent = false;

  userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    return res.status(412).json({ message: "Email is Already Used!!" });
  }

  otpAlreadySent = await Otp.findOne({ email });
  if (otpAlreadySent) {
    return res.status(412).json({
      message: "Otp Already Sent!!!",
      description: "New Otp can be generated after 3 minutes",
    });
  }

  let otp = otpGenerator();
  const mailBody = {
    subject: "Authentication Required For myBlog.com",
    html: `
    <h4>OTP for verification</h4>
    <p>${otp}</p>
    `,
  };
  try {
    sendInBlue({
      email,
      content: { otp },
      message: "",
      callback: (error, data) =>
        saveOtpInDb({ ...req.body, res, otp, error, data }),
      ...mailBody,
    });
  } catch (e) {
    return res
      .status(400)
      .json({ message: "There is some problem with this email" });
  }
};

exports.register = async (req, res) => {
  const { body: { name, email, password, otp } = {} } = req || {};
  let otpVerified = false;
  try {
    let userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json({ message: "Email Already in Use" });
    }
    let otpEntry = await Otp.findOne({ email });
    let { otp: otpInDb } = otpEntry || {};
    otpVerified = otpInDb == otp;
    if (!otpVerified) {
      return res.status(400).json({ msg: "Incorrect OTP!" });
    }
    if (otpVerified) {
      let enc_p = await encryptPassword(password);
      //   console.log('>>>>enc',enc_p)
      let user = await User.create({ name, email, password, enc_p });
      return res.status(200).json({ msg: "Registered Successfully!", user });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Internal Error" });
  }
};

exports.login = async (req, res) => {
  const { body: { email: EnteredEmail, password: EnteredPassword } = {} } =
    req || {};
  try {
    let userResult = await User.findOne({ email: EnteredEmail });
    if (!userResult) {
      return res.status(400).json({ message: "User Does Not Exists" });
    }
    let { password } = userResult || {};
    if (password != EnteredPassword) {
      return res.status(412).json({ message: "Incorrect Password" });
    }
    const payload = {
      _id: userResult._id,
    };
    const token = jwtToken(payload);
    return res
      .status(200)
      .json({ message: "Registered Successfully!", user: userResult, token });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
