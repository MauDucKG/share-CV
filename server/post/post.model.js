const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    date: {
        start_date: String,
    },
    type: [
      {
        type: String,
        enum: ["Post", "Paper", "Page"],
      },
    ],
    slug: String,
    tags: [String],
    category: [String],
    summary: String,
    location: String,
    content: String,
    author: [
      {
        id: String,
        name: String,
        profile_photo: String,
      },
    ],
    title: {
      type: String,
      required: true,
    },
    status: [
      {
        type: String,
        enum: ["Private", "Public", "PublicOnDetail"],
      },
    ],
    createdTime: String,
    fullWidth: Boolean,
    thumbnail: String,
    experience: String,
  },
  {
    collection: "posts",
  }
);

const post = mongoose.model("posts", postSchema);

module.exports = post;
