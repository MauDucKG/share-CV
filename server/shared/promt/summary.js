const extractData = require("./extractData")
const {CV_DEMO} = require("../const")

async function extractSummary(text, cv_category) {
  const PROMPT_SUMMARY1 =
    "Please provide a brief summary of the following CV that includes information about education, skills, experience, and language proficiency. Write a paragraph summarizing these details within approximately 300-350 characters."
  const PROMPT_SUMMARY2 =
    `Please provide a brief summary of the following text that includes information about education, skills, experience, and language proficiency for the job {} (omit other languages).`

  const summary1 = await extractData(PROMPT_SUMMARY1, text)
  const summary2 = await extractData(
    PROMPT_SUMMARY2.replace("{}", cv_category),
    summary1
  )

  return summary2
}

module.exports = extractSummary

// Test the function
const cv_category = "Software Engineer"
extractSummary(CV_DEMO, cv_category)
  .then((summary) => {
    // console.log(summary)
  })
  .catch((error) => {
    console.error(error)
  })
