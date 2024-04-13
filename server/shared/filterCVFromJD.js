const extractDataFromJD = require("../shared/extractDataFromJD")
const extractData = require("./promt/extractData")
const { JD_DEMO } = require("./const")
const mongoose = require("mongoose")

async function filterCVFromJD(jdText, location) {
  try {
    const jdData = await extractDataFromJD(jdText)
    mongoose.connect(
      "mongodb+srv://mauduckg:mauduckg@cluster0.liowy3n.mongodb.net/test",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    
    let location_all = ""
    if (location){
      const PROMPT_LOCATION = `Generate all names for this location separated by '|'". Example: HoChiMinh generates HoChiMinh|Ho Chi Minh City|HCMC|HCM City|Ho Chi Minh|... (minimize 10 names)`
      location_all = await extractData(PROMPT_LOCATION, location)
    }
    // Tạo biểu thức chính quy từ địa điểm
    const locationRegex = new RegExp(location_all, "i");

    const cvModel = require("../cv/cv.model")

    const cvs = await cvModel.find({
      tags: { $all: jdData.tags1 },
      location: { $regex: locationRegex }
    }).lean()

    const matchedCVs = cvs.filter(cv => {
      const experience = parseInt(cv.experience);
      return experience >= parseInt(jdData.min_exp) && experience <= parseInt(jdData.max_exp);
    });

    // mongoose.connection.close()
    return matchedCVs
  } catch (error) {
    console.error("Error filtering CV from JD:", error)
    return []
  }
}

module.exports = filterCVFromJD

// const text = `
// Bachelor's or Master's degree in Computer Science, IT or related field.
// intern experience in PHP development or related field.
// `
// const location = `ho chi minh city`
// filterCVFromJD(text, location).then((result) => {
//   console.log(result)
// })

