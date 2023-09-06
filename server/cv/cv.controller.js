const cvModel = require("./cv.model");

class  cvController {
  getAllcv(request, respond) {
    cvModel.find().exec()
      .then((cvs) => {
        respond.status(200).json({
          success: true,
          message: "Done!",
          cvs: cvs,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  newcv = async function(req, res) {
    const { date, type, slug, tags, category, summary, title, status, createdTime, fullWidth, experience, workstatus } = req.body;
    const cv = new cvModel({
      date,
      type,
      slug,
      tags,
      category,
      summary,
      title,
      status,
      createdTime,
      fullWidth,
      experience,
      workstatus,
    });
    try {
      await cv.save();
      res.status(200).send('New CV created!');
    } catch (error) {
      res.status(500).send(error);
    }
  }

  deleteCv = async function (req, res) {
    const cvId = req.params.id;
    try {
      const deletedCv = await cvModel.findByIdAndRemove(cvId);
      if (!deletedCv) {
        return res.status(404).send("CV not found");
      }
      res.status(200).send("CV deleted!");
    } catch (error) {
      res.status(500).send(error);
    }
  }

  updateCv = async function (req, res) {
    const cvId = req.params.id;
    const updateData = req.body;
    try {
      const updatedCv = await cvModel.findByIdAndUpdate(cvId, updateData, { new: true });
      if (!updatedCv) {
        return res.status(404).send("CV not found");
      }
      res.status(200).send("CV updated!");
    } catch (error) {
      res.status(500).send(error);
    }
  }


}

module.exports = new cvController();
