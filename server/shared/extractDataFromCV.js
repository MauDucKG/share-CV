const { CV_DEMO } = require("./const")

const extractExp = require("./promt/experience")
const extractFullname = require("./promt/fullname")
const extractMajor = require("./promt/major")
const extractSummary = require("./promt/summary")
const extractTags = require("./promt/tags")

async function extractDataFromCV(text, cv_category) {
  const major = await extractMajor(cv_category)
  const fullname = await extractFullname(text)
  const summary = await extractSummary(text, major)
  const experience = await extractExp(text, major, cv_category)
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
const cv_category = "Software Engineer"
extractDataFromCV(text, cv_category).then((result) => {
  console.log(result)
})