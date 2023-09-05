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
}

module.exports = new cvController();
