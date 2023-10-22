const cvModel = require("./cv.model")
const textToMarkdown = require("../shared/textToMarkdown")
const extractDataFromCV = require("../shared/extractDataFromCV")
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

  newcv = async function (req, res) {
    const { fullname, major, cvText } = req.body
    let cv = {}
    let cvitem = {}

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
        title: dataFormCV.fullname,
        status: ["Public"],
        createdTime: new Date().toISOString(),
        fullWidth: false,
        experience: dataFormCV.experience,
      })
    })

    await textToMarkdown(cvText, major).then((detail) => {
      cvitem = new cvitemModel({
        idCv: cv.slug,
        detail
      })
    })

    try {
      await cv.save()
      await cvitem.save()
      res.status(200).send("New CV created!")
    } catch (error) {
      res.status(500).send(error)
    }
  }
}

module.exports = new cvController()
