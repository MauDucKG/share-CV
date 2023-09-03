const cvitemModel = require("./cvitem.model");

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
    const { ten, thongTin, anhDaiDien } = req.body;
    const cvitem = new cvitemModel({
      ten,
      thongTin,
      anhDaiDien,
    });
    try {
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
}

module.exports = new cvitemController();
