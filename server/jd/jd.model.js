const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const jdSchema = new Schema(
  {
    title: String,
    requirements: String,
    email_company: String
  },
  {
    collection: "jds",
  }
);

const jd = mongoose.model("jds", jdSchema);

module.exports = jd;
