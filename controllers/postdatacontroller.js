const User = require("../models/UserModel");
const Otp = require("../models/OtpModel");
const ProfileModel = require("../models/ProfileModel");
require("dotenv").config();
const modelMapping = {
  User: User,
  Profile: ProfileModel,
  Otp: Otp,
};
exports.postdata = async function (req, res) {
  const { model = {}, record = {}, updates = {} } = req.body || {};
  try {
    let result = await modelMapping[model].findOneAndUpdate(record, updates);
    return res.status(200).json({ message: "Data Updated", result });
  } catch (error) {
    console.log(">>error",error);
    return res.status(500).json({ message: error.message });
  }
};
