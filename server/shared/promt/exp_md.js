import extractData from "./extractData";

async function exp_md(cv) {
    const PROMPT_EXP = `Extract from the following CV to get the part about work experience corresponding to the job ${cv_category} (company name, working position, working period (from ... to ...), job description). Experience does not include education and project. Write the above introduction into markdown text with the header "# Experience". If there is no data, skip this Experience section. For example structural information:
  # Experience

- Company name (working period (from ... to ...)) 
  - Working position
    - Description 
(This is just an example paragraph, and the information from the following CV needs to be replaced.)
  `
    const experience = await extractData(PROMPT_EXP, cv);

    return experience;
}

module.exports = exp_md