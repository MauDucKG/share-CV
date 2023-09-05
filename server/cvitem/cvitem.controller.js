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
    const cvitemId = req.params.id;
    try {
      const cvitem = await cvitemModel.findById(cvitemId);
      if (!cvitem) {
        return res.status(404).json({ message: "cvitem not found" });
      }
      res.json(cvitem);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };

  deleteCvitem = async function (req, res) {
    const cvitemId = req.params.id;
    try {
      const deletedCvitem = await cvitemModel.findByIdAndRemove(cvitemId);
      if (!deletedCvitem) {
        return res.status(404).send("cvitem not found");
      }
      res.status(200).send("cvitem deleted!");
    } catch (error) {
      res.status(500).send(error);
    }
  }

  updateCvitem = async function (req, res) {
    const cvitemId = req.params.id;
    const updateData = req.body;
    try {
      const updatedCvitem = await cvitemModel.findByIdAndUpdate(cvitemId, updateData, { new: true });
      if (!updatedCvitem) {
        return res.status(404).send("cvitem not found");
      }
      res.status(200).send("cvitem updated!");
    } catch (error) {
      res.status(500).send(error);
    }
  }

}

module.exports = new cvitemController();
