const extractData = require("./extractData")
const { TAGS1, TAGS2, CV_DEMO } = require("../const")

async function extractTags(text, cv_category) {
  const PROMPT_LANGUAGES = `Extract from the following CV the programming languages/frameworks used in the projects (only in ${cv_category}). The extracted ones should be in ((only return the word separate by comma, not duplicate)): `
  const PROMPT_PROJECT = `Among the projects that the candidate mentioned in the following CV, please extract all information about the 2 projects most relevant to the job ${cv_category}: `
  const project = await extractData(PROMPT_PROJECT, text)
  const tagsString = await extractData(PROMPT_LANGUAGES, project)
  const tags = tagsString.split(",")

  let res = []
  for (const tag of tags) {
    const PROMPT_CHECK_TAGS = `Check if this word "${tag}" is related to any of the words in the array of programming languages below or not (only return word in the following array else return None): ${TAGS1}`
    const tag_item = await extractData(PROMPT_CHECK_TAGS, "")
    if (tag_item !== null) {
      const cleanedTag = tag_item.replace(/['" ]/g, "")
      // console.log(cleanedTag)
      res.push(cleanedTag)
    }
  }

  res = res.filter((string) => {
    const lowercaseString = string.trim().toLowerCase()
    return TAGS2.some((tag) => lowercaseString === tag.toLowerCase())
  })

  return res
}

module.exports = extractTags

// // Test the function
// const cv_category = "Software Engineer"
// extractTags(CV_DEMO, cv_category)
//   .then((tags) => {
//     console.log(tags)
//   })
//   .catch((error) => {
//     console.error(error)
//   })
