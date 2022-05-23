const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const Otp = require("../models/OtpModel");
const { mailSender } = require("../utils/mailSender");
const { mailSender: sendInBlue } = require("../utils/sendinblue");
const { otpGenerator, encryptPassword } = require("../utils/utilities");
const { jwtToken } = require("../utils/jwtValidation");
const ProfileModel = require("../models/ProfileModel");
require("dotenv").config();

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
    // sendInBlue({
    //   email,
    //   content: { otp },
    //   message: "",
    // callback: (error, data) =>
    // saveOtpInDb({ ...req.body, res, otp, error, data }),
    //   ...mailBody,
    // });
    mailSender({
      email,
      content: { otp },
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
      return res.status(400).json({ message: "Incorrect OTP!" });
    }
    if (otpVerified) {
      let enc_p = await encryptPassword(password);
      //   console.log('>>>>enc',enc_p)
      let user = await User.create({ name, email, password, enc_p });
      await ProfileModel.create({ user: user._id });
      return res
        .status(200)
        .json({ message: "Registered Successfully!", user });
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
    let userResult = await User.findOne({ email: EnteredEmail }).select(
      "-enc_p"
    );
    if (!userResult) {
      return res.status(400).json({ message: "User Does Not Exists" });
    }
    let { password } = userResult || {};
    if (password != EnteredPassword) {
      console.log(">>>password", password, EnteredPassword);
      return res.status(412).json({ message: "Incorrect Password" });
    }
    const payload = {
      _id: userResult._id,
      name: userResult.name,
    };
    const token = jwtToken(payload);
    let { password: removedPassword, ...rest } = userResult;
    return res
      .status(200)
      .json({ message: "Logged In Successfully!", user: userResult, token });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getUser = async (req, res) => {
  const { body: { token } = {} } = req || {};
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    return res.status(200).json({ message: "User Exists", user: decoded });
  });
};
exports.getProfile = async (req, res) => {
  const { body: { _id } = {} } = req || {};
  try {
    let profile = await ProfileModel.findOne({ user: { _id } }).select(
      "-__v"
    ).populate(
      "user",
      "name userType email"
    );
    return res.status(200).json({ message: "User Found", profile });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.editProfile = async (req, res) => {
  console.log(">>req", req);
};
