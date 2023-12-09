const extractData = require("./promt/extractData")

// type = enum("JD", "CV")
async function generatedPost(insight, type) {
  const PROMPT_JD = `As a content creator, please write for me a attractive post to encourage IT employees to learn ${insight.category} technique decribe about ${insight.category} technique with these sections: what is ${insight.category}, benefits and drawback of it, its career opportunities, its trend in many company.`
  const PROMPT_CV = `As a content creator, please write for me a attractive post decribe about ${insight.category} technique with these sections: introduce to ${insight.category}, benefits and drawback of it, its career opportunities, why it is recently a trend in job market.`

  const post = await extractData(type == "JD" ? PROMPT_JD : PROMPT_CV, "")

  return post
}

module.exports = generatedPost

// Test case
const insight = {
  category: "React Native",
  exp: "1-3+",
  count: 24
}
generatedPost(insight, "JD").then((result) => {
  console.log("================================")
  console.log(result)
  console.log("================================")
})

