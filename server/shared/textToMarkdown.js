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
  const PROMPT_INFO = `Please provide me with the information regarding the name, github link and email address of the candidate mentioned in the CV: `
  const PROMPT_EXP = `Extract from the following CV to get the part about work experience corresponding to the job ${cv_category} (company name, working position, working period (from ... to ...), job description) : `
  const PROMPT_SKILL = `Extract information from the CV about the candidate's skills (programming skills) for job ${cv_category}: `
  const PROMPT_LANG = `Extract information about the candidate's English qualifications listed in the following CV: `
  const PROMPT_PROJECT = `Among the projects that the candidate mentioned in the following CV, please extract all information about the 2 projects most relevant to the job ${cv_category}: `

  const info = await extractData(PROMPT_INFO, text);
  const exp = await extractData(PROMPT_EXP, text);
  const skill = await extractData(PROMPT_SKILL, text);
  const lang = await extractData(PROMPT_LANG, text);
  const project = await extractData(PROMPT_PROJECT, text);
  const res = info + '\n' + exp + '\n' + skill + '\n' + lang + '\n' + project + '\n'
  return res;
}

module.exports = textToMarkdown