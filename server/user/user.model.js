const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    login: String,
    name: String,
    avatar: String,
    role: String,
    email: String,
    phone: String,
    bio: String,
    company: String,
    location: String,
    isRestricted: Boolean,
    createdTime: String
  },
  {
    collection: "users",
  }
);

const user = mongoose.model("users", userSchema);

module.exports = user;
