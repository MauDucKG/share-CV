const extractData = require("./promt/extractData")

async function generateBlog(insight, prompt) {
  let statistic = ""
  for (let figure of insight.figures) {
    statistic += `There are ${figure.count} resume(s) with ${figure.exp} years experience(s) in ${insight.category} registered in ShareCV in last ${insight.period} month(s).`
  }
  const PROMPT_GENERATE_BLOG = `As a content creator, please write for me a attractive blog to describe the content of this command: '${prompt}'. Because, for the content to be engaging and persuasive, please add a section about the number of CV(s) uploaded to ShareCV by using the following provided information analyzed from my system/application named ShareCV to write the blog: ${statistic}.`

  const blog = await extractData(PROMPT_GENERATE_BLOG, "")

  return blog
}

module.exports = generateBlog

// Test case
const insight = {
  category: "Java",
  figures: [
    {
      exp: "<1",
      count: 21,
    },
    {
      exp: "1-3",
      count: 3090,
    },
    {
      exp: "3-5",
      count: 192,
    },
    {
      exp: "5+",
      count: 248,
    },
  ],
  period: "1",
}
// generateBlog(insight, "Write the blog to describe about the trend of Java job recently").then((result) => {
//   console.log("================================")
//   console.log(result)
//   console.log("================================")
// })
