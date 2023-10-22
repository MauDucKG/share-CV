const { TextServiceClient } = require("@google-ai/generativelanguage").v1beta2;
const { GoogleAuth } = require("google-auth-library");
const { TAGS, CATEGORYS } = require("./const")

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

async function extractDataFromCV(text, cv_category) {
    const PROMPT_MAJOR = `From this text: "${cv_category}", please select the most appropriate word mentioned here: "${CATEGORYS}" (only return the word not in "")`
    const major = await extractData(PROMPT_MAJOR, "");
    const PROMPT_PROJECT = `Among the projects that the candidate mentioned in the following CV, please extract all information about the 2 projects most relevant to the job ${cv_category}: `
    const project = await extractData(PROMPT_PROJECT, text);

    const PROMPT_FULLNAME = `Please provide me with the full name of the candidate mentioned in the CV: `
    const PROMPT_SUMMARY = `Please provide a brief summary of the CV: `
    const PROMPT_EXP = `Extract from the following CV to get the part about work experience corresponding to the job ${major} (company name, working position, working period (from ... to ...), job description) : `
    const PROMPT_EXPERIENCE = `Extract from the following CV to get the total months of work experience in ${major}): `
    const PROMPT_LANGUAGES = `Extract from the CV the programming languages/frameworks used in the projects (only in ${TAGS}), the extracted ones should be in ((only return the word separate by comma, not duplicate)): `

    const fullname = await extractData(PROMPT_FULLNAME, text);
    const summary = await extractData(PROMPT_SUMMARY, text);
    const exp = await extractData(PROMPT_EXP, text);
    const experience = await extractData(PROMPT_EXPERIENCE, exp);
    const tagsString = await extractData(PROMPT_LANGUAGES, project);
    const tags = tagsString.split(",");
    console.log(tags)

    const res = {
        fullname,
        summary,
        experience,
        tags,
        major, 
    };
    return res;
}

module.exports = extractDataFromCV