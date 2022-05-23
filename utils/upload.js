const express = require("express"),
  aws = require("aws-sdk"),
  bodyParser = require("body-parser"),
  multer = require("multer"),
  multerS3 = require("multer-s3");

aws.config.update({
  secretAccessKey: "oJOpa0M5o1LQzG/yII4UhBm3HskpBTqILBQzHAM6",
  accessKeyId: "AKIA5QZU65VU3VJJWD5M",
  region: "us-east-1",
});

var app = express(),
  s3 = new aws.S3({
    bucket_region:"ap-south-1",
    aws_access_key:"oJOpa0M5o1LQzG/yII4UhBm3HskpBTqILBQzHAM6",
    aws_secret_key:"AKIA5QZU65VU3VJJWD5M",
  });

app.use(bodyParser.json());

const upload = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: "note-demo",
    key: function (req, file, cb) {
      console.log(file);
      cb(null, file.originalname); //use Date.now() for unique file keys
    },
  }),
});

module.exports = { upload };
