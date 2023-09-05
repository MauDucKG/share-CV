const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cvSchema = new Schema(
  {
    date: {
        type: String,
        required: true,
    },
    type: [
      {
        type: String,
        enum: ["Vietnam", "English", "Other"],
        required: true,
      },
    ],
    slug: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    category: [
      {
        type: String,
      },
    ],
    summary: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    status: [
      {
        type: String,
        enum: ["on", "off"],
        required: true,
      },
    ],
    createdTime: {
      type: String,
      required: true,
    },
    fullWidth: {
      type: Boolean,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    workstatus: {
      type: String,
      required: true,
    },
  },
  {
    collection: "cvs",
  }
);

const cv = mongoose.model("cvs", cvSchema);

module.exports = cv;
