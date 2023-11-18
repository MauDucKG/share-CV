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
  const PROMPT_INFO = `Please provide me with the information regarding the name, github link and email address of the candidate mentioned in the following CV. Write name, github link and email information in 2 different lines (with bullet points) and add header "# Information" at the beginning (write in markdown format). For example:
  # Information
- Name: 
- Github: 
- Email:
- Location:  
  `
  const PROMPT_EXP = `Extract from the following CV to get the part about work experience corresponding to the job ${cv_category} (company name, working position, working period (from ... to ...), job description). Experience does not include education and project. Write the above introduction into markdown text with the header "# Experience". If there is no data, skip this Experience section. For example structural information:
  # Experience

- Company name (working period (from ... to ...)) 
  - Working position
    - Description 
(This is just an example paragraph, and the information from the following CV needs to be replaced.)
  `


  const PROMPT_SKILL = `Extract information from the CV about the candidate's skills (programming skills) for job ${cv_category}. If no data is available, skip. Write this information into markdown style with header "#Skill". For example:
  # Skills

* Programming languages:
  * Description (If no data is available, skip and write No data)
* Programming paradigms:
  * Description (If no data is available, skip and write No data)
* Web development:
  * Description (If no data is available, skip and write No data)
* Mobile development:
  * Description (If no data is available, skip and write No data)
* Data programming:
  * Description (If no data is available, skip and write No data)
(This is just an example paragraph, and the information from the following CV needs to be replaced.)

  `

  const PROMT_CERTIFICATE = `Does the following CV mention the international English language test? If no data is available, write "No English qualifications listed". Extract information about the international English language test in the following CV.`
  const PROMPT_LANG = `Write this information into markdown style with header "#English". For example structural information:
  # English 
- Name international English language test score:  (month/year) (If No English qualifications listed, skip and only write "No English qualifications listed")
  `
  const PROMPT_PROJECT = `Among the projects that the candidate mentioned in the following CV, please extract all information about the 2 projects most relevant to the job ${cv_category}. Write this information into markdown style with header "#Project". For example structural information:
  # Project
- **Name project 1**
  * Description 1
  * Description 2
- **Name project 2**
  * Description 1
  * Description 2
(This is just an example paragraph, and the information from the following CV needs to be replaced.)

  `

  const info = await extractData(PROMPT_INFO, text);
  const exp = await extractData(PROMPT_EXP, text);
  const skill = await extractData(PROMPT_SKILL, text);
  const certificate = await extractData(PROMT_CERTIFICATE, text)
  const lang = await extractData(PROMPT_LANG, certificate);
  const project = await extractData(PROMPT_PROJECT, text);
  const res = info + '\n' + exp + '\n' + skill + '\n' + lang + '\n' + project + '\n'
  return res;
}

module.exports = textToMarkdown