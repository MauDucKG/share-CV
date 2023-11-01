import extractData from "./extractData";

async function fullname(cv) {
    const PROMPT_INFO = "Please provide me with the information regarding the name, github link and email address of the candidate mentioned in the CV. Write name, github link and email information: "
    const PROMPT_FULLNAME = "Extract the name information from the following CV. Write the name."
    
    const information = await extractData(PROMPT_INFO, text);
    const fullname = await extractData(PROMPT_FULLNAME, information);

    return fullname;
}

module.exports = fullname