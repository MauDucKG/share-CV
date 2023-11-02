import extractData from "./extractData";

async function summary(cv) {
    const PROMPT_SUMMARY = `Please provide a brief summary of the following CV that includes information about education, skills, experience, and language proficiency. Write a paragraph summarizing these details within approximately 300-350 characters.`

    const summary = await extractData(PROMPT_SUMMARY, cv);

    return summary;
}

module.exports = summary