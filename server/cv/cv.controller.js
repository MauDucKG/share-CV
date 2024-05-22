const cvModel = require("./cv.model")
const textToMarkdown = require("../shared/textToMarkdown")
const extractDataFromCV = require("../shared/extractDataFromCV")
const extractData = require("../shared/promt/extractData")

const cvitemModel = require("../cvitem/cvitem.model")
class cvController {
  async getAllcv(request, respond) {
    cvModel
      .find()
      .exec()
      .then((cvs) => {
        respond.status(200).json({
          success: true,
          message: "Done!",
          cvs: cvs,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async getOne(request, respond) {
    try {
      const cv = await cvModel.findById(request.params.id);
  
      if (!cv) {
        respond.status(404).json({
          success: false,
          message: "CV not found",
        });
        return;
      }
  
      respond.status(200).json(cv);

    } catch (error) {
      console.log(error);
      respond.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  async updatecv(request, respond) {
    const { 
      date, 
      type, 
      slug, 
      tags, 
      category, 
      summary, 
      location, 
      title, 
      status, 
      createdTime, 
      fullWidth, 
      experience, 
      author
    } = request.body;

    try {
      let cv = await cvModel.findById(request.params.id);
  
      if (!cv) {
        return respond.status(404).json({
          success: false,
          message: "CV not found",
        });
      }
  
      cv.date = date;
      cv.type = type;
      cv.slug = slug;
      cv.tags = tags;
      cv.category = category;
      cv.summary = summary;
      cv.location = location;
      cv.title = title;
      cv.status = status;
      cv.createdTime = createdTime;
      cv.fullWidth = fullWidth;
      cv.experience = experience;
      cv.author = author;

      await cv.save();
  
      respond.status(200).json({
        success: true,
        message: "CV updated successfully",
      });
    } catch (error) {
      console.error(error);
      respond.status(500).json({
        success: false,
        message: "An error occurred while updating the CV",
      });
    }
  }

  newcv = async function (req, res) {
    const { fullname, major, cvText, userdata } = req.body
    let cv = {}
    let cvitem = {}
    let aboutCvitem = {}
    let number = 0
    let countBelow24Months = 0
    let countAbove24Months = 0
    let countNewApplicants = 0

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    await extractDataFromCV(cvText, major).then((dataFormCV) => {
      // Generate a unique slug for each CV
      const slug = require("crypto").randomBytes(10).toString("hex")

      cv = new cvModel({
        date: {
          start_date: new Date().toISOString(),
        },
        type: ["Post"],
        slug: slug, // Use the unique slug here
        tags: dataFormCV.tags,
        category: [dataFormCV.major],
        summary: dataFormCV.summary,
        location: dataFormCV.location,
        title: dataFormCV.fullname,
        status: ["Public"],
        createdTime: new Date().toISOString(),
        fullWidth: false,
        experience: dataFormCV.experience,
        author: [
          {
            name: userdata ? (userdata.name !== "" ? userdata.name : userdata.login) : null,
            profile_photo: userdata ? userdata.avatar : null,
          },
        ]
      })
    })

    await textToMarkdown(cvText, major).then((detail) => {
      cvitem = new cvitemModel({
        idCv: cv.slug,
        detail,
      })
    })

    await cv.save()
    await cvitem.save()
    res.status(200).json({ message: "New CV created!", slug: cv.slug })

    const cvs = await cvModel.find().exec()
    cvs.forEach((cv) => {
      number++
      const experience = parseInt(cv.experience)
      if (experience <= 24) {
        countBelow24Months++
      } else {
        countAbove24Months++
      }
      const createdTime = new Date(cv.createdTime)
      createdTime.setHours(0, 0, 0, 0)

      if (createdTime.getTime() === today.getTime()) {
        countNewApplicants++
      }
    })

    try {
      aboutCvitem = await cvitemModel.findOne({ idCv: "about" })
      if (!aboutCvitem) {
        aboutCvitem = new cvitemModel({
          idCv: "about",
          detail: "",
        })
      }
      const text = `
- Job seekers demand: ${number} candidates
- Number of interns/freshers (below 2 years of experience): ${countBelow24Months} candidates 
- Number of candidates with over 2 years of experience: ${countAbove24Months} candidates
- Number of new CVs today: ${countNewApplicants} CVs
      
`
      const summary = await extractData(
        `Write a market analysis article based on the following paragraph in markdown.`,
        text
      )
      if (aboutCvitem) {
        aboutCvitem.detail = text + "\n" + summary
      }

      await aboutCvitem.save()
    } catch (error) {
      res.status(500).send(error)
    }
  }

  async deletecv(request, respond) {
    try {
      const cv = await cvModel.findById(request.params.id);

      if (!cv) {
        return respond.status(404).json({
          success: false,
          message: "CV not found"
        });
      }
  
      cv.status[0] = "Private"
      await cv.save();
  
      respond.status(200).json({
        success: true,
        message: "CV deleted successfully"
      });
    } catch (error) {
      console.error(error);
      respond.status(500).json({
        success: false,
        message: "An error occurred while deleting the cv"
      });
    }
  }
}

module.exports = new cvController()
