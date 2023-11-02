import extractData from "./extractData";
const { TAGS, CATEGORYS } = require("../const")

async function tag(cv, cv_category) {
    const PROMPT_PROJECT = `Among the projects that the candidate mentioned in the following CV, please extract all information about the 2 projects most relevant to the job ${cv_category}: `
    const PROMPT_LANGUAGES = `Extract from the following CV the programming languages/frameworks used in the projects (only in ${TAGS}), the extracted ones should be in ((only return the word separate by comma, not duplicate)): `

    const project = await extractData(PROMPT_PROJECT, cv);
    const tagsString = await extractData(PROMPT_LANGUAGES, project);
    const tags = tagsString.split(",");

    return tags;
}

module.exports = tag