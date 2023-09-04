const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cvSchema = new Schema(
  {
    ten: {
      type: String,
      required: true
    },
    viTri: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,
      required: true
    }
  },
  {
    collection: "cvs",
  }
);

const cv = mongoose.model("cvs", cvSchema);

module.exports = cv;
