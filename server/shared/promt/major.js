const extractData = require("./extractData")
const { CATEGORYS1, CATEGORYS2, CV_DEMO } = require("../const")

async function extractMajor(cv_category) {
  const PROMPT_CHECK_MAJOR = `If this word "${cv_category}" is related to any of the words in the array of IT majors below (only return words in the following array, don't return others): "${CATEGORYS1}"`

  const major = await extractData(PROMPT_CHECK_MAJOR, "")
  const major1 = major.replace(/['"]/g, "")
  
  const lowercaseString = major1.trim().toLowerCase()
  return CATEGORYS2.find((tag) => lowercaseString === tag.toLowerCase()) || null
}

module.exports = extractMajor

// Test case
const cv_category = "SW Developer"
extractMajor(CV_DEMO, cv_category).then((result) => {
  console.log(result)
})
