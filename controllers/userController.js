const User = require("../models/UserModel");
const Otp = require("../models/OtpModel");
const { mailSender } = require("../utils/mailSender");
const { otpGenerator, encryptPassword } = require("../utils/utilities");
const { jwtToken } = require("../utils/jwtValidation");

const saveOtpInDb = async (params) => {
  let { res, ...rest } = params || {};
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
  try {
    mailSender({
      email,
      content: { otp },
      message: "",
      callback: () => saveOtpInDb({ ...req.body, res, otp }),
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
    let userAlreadyExists = await User.findOne({email})
    if(userAlreadyExists){
        return res.status(400).json({message:'Email Already in Use'})
    }
    let otpEntry = await Otp.findOne({ email });
    let { otp: otpInDb } = otpEntry || {};
    otpVerified = otpInDb === otp;
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
  let userResult = await User.findOne({ email: EnteredEmail });
  if (!userResult) {
    return res.status(400).json({ message: "User Does Not Exists" });
  }
  let { password } = userResult || {};
  if (password !== EnteredPassword) {
    return res.status(412).json({ message: "Incorrect Password" });
  }
  const token = jwtToken();
  return res
    .status(200)
    .json({ message: "Registered Successfully!", user: userResult, token });
};