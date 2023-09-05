const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cvitemSchema = new Schema(
  {
    // id: {
    //   type: String,
    //   required: true,
    // },
    idCv: {
      type: Schema.Types.ObjectId,
      // type: Schema.Types.ObjectId,
      // ref: "cv",
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
  },
  {
    collection: "cvitems",
  }
);

const cvitem = mongoose.model("cvitems", cvitemSchema);

module.exports = cvitem;
