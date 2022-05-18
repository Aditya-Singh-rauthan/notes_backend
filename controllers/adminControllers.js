const User = require("../models/UserModel");
const {TypeModel} = require("../models/FieldModels")
exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    if (allUsers) {
      return res.status(200).json({ message: "OK", users: allUsers });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error" });
  }
};
