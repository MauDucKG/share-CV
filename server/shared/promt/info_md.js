import extractData from "./extractData";

async function info_md(cv) {
    const PROMPT_INFO = `Please provide me with the information regarding the name, github link and email address of the candidate mentioned in the following CV. Write name, github link and email information in 2 different lines (with bullet points) and add header "# Information" at the beginning (write in markdown format). For example:
  # Information
- Name: 
- Github: 
- Email: 
  `    
    const information = await extractData(PROMPT_INFO, cv);

    return information;
}

module.exports = info_md