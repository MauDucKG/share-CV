const { JD_DEMO, TAGS1, TAGS2, CATEGORYS2 } = require("./const")
const extractData = require("./promt/extractData")

async function extractDataFromJD(text) {
  const PROMPT_POSITION = `From the job description below, please indicate the mentioned position (only return the name of the position): `
  const PROMPT_MIN_EXP = `With this job description, how many months of experience does the candidate need to have at a minimum (If it's an intern level, the maximum is 0 months. For fresher level, it's 6 months. Junior level requires 12 months of experience. Middle level requires 24 months, and senior level requires 60 months of experience.)? (Please answer with a number):  `
  const PROMPT_MAX_EXP = `With this job description, how many months of experience does the candidate need to have at a maximum (If it's an intern level, the maximum is 6 months. For fresher level, it's 12 months. Junior level requires 24 months of experience. Middle level requires 48 months, and senior level requires 120 months of experience.)? (Please answer with a number):  `
  const PROMPT_LANGUAGES_JD = `Extract from the following job description required the programming languages/frameworks the candidate needs (not have an advantage). The extracted ones should be in ((only return the word separate by comma, not duplicate)): `

  const position = await extractData(PROMPT_POSITION, text)
  const position1 = position.replace(/['"]/g, "")

  const lowercaseString = position1.trim().toLowerCase()
  const position2 =
    CATEGORYS2.find((tag) => lowercaseString === tag.toLowerCase()) || null
  const PROMPT_REQUIRED = `From the following job description, extract the section that mentions the required qualifications for candidates (in position "${position2}"): `

  const required = await extractData(PROMPT_REQUIRED, text)
  // const required =text
  const min_exp = await extractData(PROMPT_MIN_EXP, required)
  const max_exp = await extractData(PROMPT_MAX_EXP, required)

  const tagsString = await extractData(PROMPT_LANGUAGES_JD, required)
  const tags = tagsString.split(",")
  console.log(tags)

  let tags1 = []

  for (const tag of tags) {
    const PROMPT_CHECK_TAGS = `Check if this word "${tag}" is related to any of the words in the array of programming languages below or not (only return word in the following array else return None): ${TAGS1}`
    const tag_item = await extractData(PROMPT_CHECK_TAGS, "")
    if (tag_item !== null) {
      const cleanedTag = tag_item.replace(/['" ]/g, "")
      tags1.push(cleanedTag)
    }
  }

  tags1 = tags1.filter((string) => {
    const lowercaseString = string.trim().toLowerCase()
    return TAGS2.some((tag) => lowercaseString === tag.toLowerCase())
  })

  const res = {
    min_exp,
    max_exp,
    tags1,
  }

  return res
}

module.exports = extractDataFromJD

// Test case
const text = JD_DEMO
extractDataFromJD(text).then((result) => {
  console.log(result)
})
