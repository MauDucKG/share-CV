const { CV_DEMO } = require("./const")

const extractData = require("./promt/extractData")
const extractFullname = require("./promt/fullname")
const extractMajor = require("./promt/major")
const extractSummary = require("./promt/summary")
const extractTags = require("./promt/tags")

async function extractDataFromCV(text, cv_category) {
  const major = await extractMajor(cv_category)
  const PROMPT_EXP = `Extract from the following CV to get the part about work experience corresponding to the job ${cv_category} (company name, working position, working period (from ... to ...), job description). Write the above introduction into markdown text with the header "# Experience" and the bullet points are information: company name - working position -  working period (These are in the same line), job description. If there is no data, skip.`

  const PROMPT_EXPERIENCE = `Extract the information from the following CV to determine the total months of work experience in ${major}. In this calculation, the period from January to February in a year should be considered as 1 month. Please write the result as 'number months' (e.g., 1 month, 2 months) to ensure the unit is specified as months after the number.`

  const fullname = await extractFullname(text)
  const summary = await extractSummary(text, major)
  const exp = await extractData(PROMPT_EXP, text)
  const experience = await extractData(PROMPT_EXPERIENCE, exp)
  const tags = await extractTags(text, major)

  const res = {
    fullname,
    summary,
    experience,
    tags,
    major,
  }
  return res
}

module.exports = extractDataFromCV

// Test case
const text = CV_DEMO
const cv_category = "SW Developer"
extractDataFromCV(text, cv_category).then((result) => {
  console.log(result)
})