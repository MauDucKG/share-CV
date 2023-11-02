import extractData from "./extractData";
const { TAGS, CATEGORYS } = require("../const")

async function major(cv_category) {
    const PROMPT_MAJOR = `From this text: "${cv_category}", please select the most appropriate word mentioned here: "${CATEGORYS}" (only return the word not in ""). Prioritize the word within the work experience`
    
    const major = await extractData(PROMPT_MAJOR, "");

    return major;
}

module.exports = major