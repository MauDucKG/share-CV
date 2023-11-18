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

  newcv = async function (req, res) {
    const { fullname, major, cvText } = req.body
    let cv = {}
    let cvitem = {}
    let aboutCvitem = {}
    let number = 0
    let countBelow24Months = 0;
    let countAbove24Months = 0;
    let countNewApplicants = 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0); 
  
    

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

    await cv.save()
    await cvitem.save()
    res.status(200).send("New CV created!")

    const cvs = await cvModel.find().exec();
    cvs.forEach((cv) => {
      number++;
      const experience = parseInt(cv.experience);
      if (experience <= 24) {
        countBelow24Months++;
      } else {
        countAbove24Months++;
      }
      const createdTime = new Date(cv.createdTime);
      createdTime.setHours(0, 0, 0, 0); 
  
      if (createdTime.getTime() === today.getTime()) {
        countNewApplicants++;
      }
    });

    try {
      aboutCvitem = await cvitemModel.findOne({ idCv: 'about' });
      if (!aboutCvitem) {
        aboutCvitem = new cvitemModel({
          idCv: 'about',
          detail: ''
        });
      }
      const text = `
- Job seekers demand: ${number} candidates
- Number of interns/freshers (below 2 years of experience): ${countBelow24Months} candidates 
- Number of candidates with over 2 years of experience: ${countAbove24Months} candidates
- Number of new CVs today: ${countNewApplicants} CVs
      
`
      const summary = await extractData(`Write a market analysis article based on the following paragraph in markdown. Draw a graph running in python then display the associated image`, text);;
      if (aboutCvitem) {
        aboutCvitem.detail = text + '\n' + summary;
      }

      await aboutCvitem.save();
    } catch (error) {
      res.status(500).send(error)
    }
  }
}

module.exports = new cvController()
