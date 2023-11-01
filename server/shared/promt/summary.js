import extractData from "./extractData";

async function extractDataFromCV(text, cv_category) {
    const PROMPT_SUMMARY = `Please provide a brief summary of the following CV that includes information about education, skills, experience, and language proficiency. Write a paragraph summarizing these details within approximately 300-350 characters.`
    const PROMPT_EXP = `Extract from the following CV to get the part about work experience corresponding to the job ${cv_category} (company name, working position, working period (from ... to ...), job description). Write the above introduction into markdown text with the header "# Experience" and the bullet points are information: company name - working position -  working period (These are in the same line), job description. If there is no data, skip.`
  
    const PROMPT_EXPERIENCE = `Extract the information from the following CV to determine the total months of work experience in ${major}. In this calculation, the period from January to February in a year should be considered as 1 month. Please write the result as 'number months' (e.g., 1 month, 2 months) to ensure the unit is specified as months after the number.`

    // const PROMPT_EXPERIENCE = `Extract the information from the following CV to determine the total months of work experience in ${major}. In this calculation, the period from January to February in a year should be considered as 1 month. Please write the result as 'number months' (e.g., 1 month, 2 months) to ensure the unit is specified as months after the number.`
    const PROMPT_LANGUAGES = `Extract from the following CV the programming languages/frameworks used in the projects (only in ${TAGS}), the extracted ones should be in ((only return the word separate by comma, not duplicate)): `

    const information = await extractData(PROMPT_INFO, text);
    const fullname = await extractData(PROMPT_FULLNAME, information);
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