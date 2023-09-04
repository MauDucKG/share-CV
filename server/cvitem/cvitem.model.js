const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cvitemSchema = new Schema(
  {
    ten: {
      type: String,
      required: true,
    },
    thongTin: {
      type: String,
    },
    anhDaiDien: {
      type: String,
    },
  },
  {
    collection: "cvitems",
  }
);

const cvitem = mongoose.model("cvitems", cvitemSchema);

module.exports = cvitem;
