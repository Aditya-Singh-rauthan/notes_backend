const mongoose = require("mongoose");

const statusSchema = mongoose.Schema({
  name: {
    type: String,
  },
  value:{
    type: String,
  }
});

const typeSchema = mongoose.Schema({
  name: {
    type: String,
  },
  value:{
    type: String,
  }
});

const userTypeSchema = mongoose.Schema({
  name: {
    type: String,
  },
  value:{
    type: String,
  }
});

module.exports = {
  StatusModel: mongoose.model("Status", statusSchema),
  TypeModel: mongoose.model("Type", typeSchema),
  UserTypeModel: mongoose.model("UserType", userTypeSchema),
};
