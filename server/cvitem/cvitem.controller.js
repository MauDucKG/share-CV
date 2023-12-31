const cvitemModel = require("./cvitem.model");
const cvModel = require("../cv/cv.model");

class cvitemController {
  getAllcvitem(request, respond) {
    cvitemModel.find().exec()
      .then((cvitems) => {
        respond.status(200).json({
          success: true,
          message: "Done!",
          cvitems: cvitems,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  newcvitem = async function (req, res) {
    const { idCv, detail } = req.body;

    try {
      const cvExist = await cvModel.findById(idCv).exec();
      if (!cvExist) {
        return res.status(404).send("Invalid cv id");
      }

      const cvitem = new cvitemModel({
        idCv,
        detail,
      });
      await cvitem.save();
      res.status(200).send("New cvitem created!");
    } catch (error) {
      res.status(500).send(error);
    }
  };

  getcvitemById = async (req, res) => {
    const idCv = req.params.id;
    try {
      const cvitem = await cvitemModel.findOne({ idCv });
      if (!cvitem) {
        return res.status(404).json({ message: "cvitem not found" });
      }
      res.json(cvitem);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };
}

module.exports = new cvitemController();
