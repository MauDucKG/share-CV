const extractData = require("./extractData")
const {CV_DEMO} = require("../const")

async function extractFullname(cv) {
    const PROMPT_INFO = "Please provide me with the information regarding the name, github link and email address of the candidate mentioned in the CV. Write name, github link and email information: "
    const PROMPT_FULLNAME = "Extract the name information from the following CV. Write the name (not all uppercase)."
    
    const information = await extractData(PROMPT_INFO, cv);
    const fullname = await extractData(PROMPT_FULLNAME, information);

    return fullname;
}

module.exports = extractFullname

// Test the function
extractFullname(CV_DEMO)
  .then((fullname) => {
    // console.log(fullname);
  })
  .catch((error) => {
    console.error(error);
  });