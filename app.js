// const express = require('express')
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

// Route Imports
const user = require("./routes/UserRoutes");
const admin = require("./routes/adminRoutes");
const fields = require("./routes/FieldRoutes");
const postdata = require("./routes/PostDataRoutes");
const { upload } = require("./utils/upload");
const ProfileModel = require("./models/ProfileModel");
const { jwtValidation } = require("./utils/jwtValidation");
app.use("/api/v1", user);
app.use("/api/v1", admin);
app.use("/api/v1", fields);
app.use("/postdata",postdata)

app.post("/upload", upload.array("files", 5), async function (req, res) {
  try {
    let { query: { uploadType, profileId } = {} } = req || {};
    let urls = req.files.map(function (file) {
      return {
        url: file.location,
        name: file.key,
        type: file.mimetype,
        size: file.size,
      };
    });
    if (uploadType === "profile_pic") {
      let result = await ProfileModel.findOneAndUpdate(
        { _id: profileId },
        { profile_pic: urls[0] }
      );
      return res
        .status(200)
        .json({
          message: "Image Uploaded",
          result: { ...result, profile_pic: { ...urls[0] } },
        });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


module.exports = app;
