const extractDataFromJD = require("../shared/extractDataFromJD")
const { JD_DEMO } = require("./const")
const mongoose = require("mongoose")

async function filterCVFromJD(jdText) {
  try {
    const jdData = await extractDataFromJD(jdText)
    console.log(jdData)
    mongoose.connect(
      "mongodb+srv://mauduckg:mauduckg@cluster0.liowy3n.mongodb.net/test",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )

    const cvModel = mongoose.model(
      "cv",
      new mongoose.Schema()
    )

    const cvs = await cvModel.find({
      tags: { $all: jdData.tags1 },
    }).lean()

    const matchedCVs = cvs.filter(cv => {
      const experience = parseInt(cv.experience);
      return experience >= parseInt(jdData.min_exp) && experience <= parseInt(jdData.max_exp);
    });

    mongoose.connection.close()
    return matchedCVs
  } catch (error) {
    console.error("Error filtering CV from JD:", error)
    return []
  }
}

module.exports = filterCVFromJD

const text = `
Bachelor's or Master's degree in Computer Science, IT or related field.
intern experience in PHP development or related field.
`
filterCVFromJD(text).then((result) => {
  console.log(result)
})

