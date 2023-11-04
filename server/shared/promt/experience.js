const extractData = require("./extractData")

async function experience(cv, major, cv_category) {
    const PROMPT_EXP_MD = `Extract from the following CV to get the part about work experience corresponding to the job ${cv_category} sector (company name, working position, working period (from ... to ...), job description). Write the above introduction into markdown text with the header "# Experience" and the bullet points are information: company name - working position -  working period (These are in the same line), job description. If there is no data, skip.`
  
    const sector = major ? major : cv_category
    const PROMPT_EXP_MONTH = `Extract the information from the following markdown text to determine the total months of work experience only in ${sector} sector, excluding unrelated sectors. In this calculation, the period from January to February in a year should be considered as 1 month. Please write the result as 'number months' (e.g., 1 month, 2 months) to ensure the unit is specified as months after the number.`
    
    const exp = await extractData(PROMPT_EXP_MD, cv);
    const month_experience = await extractData(PROMPT_EXP_MONTH, exp);

    return month_experience;
}

module.exports = experience