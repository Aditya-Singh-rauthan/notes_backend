const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ret: "Notes",
    },
  ],
  about: {
    type: String,
    maxLength: 300,
  },
  facebook: {
    type: String,
  },
  instagram: {
    type: String,
  },
  youtube: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  git: {
    type: String,
  },
  designation: {
    type: String,
  },
  address: {
    type: String,
  },
});

module.exports = mongoose.model("Profile", profileSchema);
