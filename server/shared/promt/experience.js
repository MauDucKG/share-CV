import extractData from "./extractData";

async function experience(cv) {
    const PROMPT_EXP = `Extract from the following CV to get the part about work experience corresponding to the job ${cv_category} (company name, working position, working period (from ... to ...), job description). Write the above introduction into markdown text with the header "# Experience" and the bullet points are information: company name - working position -  working period (These are in the same line), job description. If there is no data, skip.`
  
    const PROMPT_EXPERIENCE = `Extract the information from the following CV to determine the total months of work experience in ${major}. In this calculation, the period from January to February in a year should be considered as 1 month. Please write the result as 'number months' (e.g., 1 month, 2 months) to ensure the unit is specified as months after the number.`

    
    const exp = await extractData(PROMPT_EXP, cv);
    const experience = await extractData(PROMPT_EXPERIENCE, exp);

    return experience;
}

module.exports = experience