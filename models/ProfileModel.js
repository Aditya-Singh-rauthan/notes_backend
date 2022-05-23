const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  profile_pic: {
    url: {
      type: String,
    },
    name: {
      type: String,
    },
    type: {
      type: String,
    },
    size: {
      type: Number,
    },
  },
  about: {
    type: String,
    maxLength: 300,
    default: "",
  },
  facebook: {
    type: String,
    default: "",
  },
  instagram: {
    type: String,
    default: "",
  },
  youtube: {
    type: String,
    default: "",
  },
  linkedin: {
    type: String,
    default: "",
  },
  git: {
    type: String,
    default: "",
  },
  designation: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Profile", profileSchema);
