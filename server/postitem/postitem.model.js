const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postitemSchema = new Schema(
  {
    idPost: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
  },
  {
    collection: "postitems",
  }
);

const postitem = mongoose.model("postitems", postitemSchema);

module.exports = postitem;
