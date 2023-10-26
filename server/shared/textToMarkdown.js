const { TextServiceClient } = require("@google-ai/generativelanguage").v1beta2;
const { GoogleAuth } = require("google-auth-library");

const MODEL_NAME = "models/text-bison-001";
const API_KEY = "AIzaSyDRSSB98nK78iOssd_Mwm-vJc47foqjwZk"

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

const extractData = async (prompt, cv) => {
  const combined_prompt = `${prompt} "${cv}"`
  let generatedText = "";
  try {
    const res = await client.generateText({
      model: MODEL_NAME,
      prompt: {
        text: combined_prompt,
      },
    });
    generatedText = res[0].candidates[0].output;
    return generatedText;
  } catch (err) {
    console.log(err);
    return "";
  }
}

async function textToMarkdown(text, cv_category) {
  const PROMPT_INFO = `Please provide me with the information regarding the name, github link and email address of the candidate mentioned in the CV. Write name, github link and email information in 2 different lines (with bullet points) and add header "# Information" at the beginning (write in markdown format). For example:
  # Information
- Name: 
- Github: 
- Email: 
  `
  const PROMPT_EXP = `Extract from the following CV to get the part about work experience corresponding to the job ${cv_category} (company name, working position, working period (from ... to ...), job description). Write the above introduction into markdown text with the header "# Experience" and the bullet points are information: company name - working position -  working period (These are in the same line), job description. For example:
  # Experience

- Company name (working period (from ... to ...)) 
  - Working position
    - Description
  `
  const PROMPT_SKILL = `Extract information from the CV about the candidate's skills (programming skills) for job ${cv_category}. Write this information into markdown style with header "#Skill". For example:
  # Skills

* Programming languages:
    * C++
    * Python
    * Haskell
    * ABAP
* Programming paradigms:
    * Object-oriented programming
    * Functional programming
* Web development:
    * HTML
    * CSS
    * PHP
    * React
    * Nodejs
* Mobile development:
    * React Native
  `
  const PROMPT_LANG = `Extract information about the candidate's English qualifications listed in the following CV. Write this information into markdown style with header "#English". For example:
  # English
    * TOEIC score: 555 (8/2022)
  `
  const PROMPT_PROJECT = `Among the projects that the candidate mentioned in the following CV, please extract all information about the 2 projects most relevant to the job ${cv_category}. Write this information into markdown style with header "#Project". For example:
  # Project
  - **Name project 1**
    * Description 1
    * Description 2
  - **Name project 2**
    * Description 1
    * Description 2
  `

  const info = await extractData(PROMPT_INFO, text);
  const exp = await extractData(PROMPT_EXP, text);
  const skill = await extractData(PROMPT_SKILL, text);
  const lang = await extractData(PROMPT_LANG, text);
  const project = await extractData(PROMPT_PROJECT, text);
  const res = info + '\n' + exp + '\n' + skill + '\n' + lang + '\n' + project + '\n'
  return res;
}

module.exports = textToMarkdown