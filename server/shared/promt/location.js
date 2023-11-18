const extractData = require("./extractData")
const {CV_DEMO} = require("../const")

async function extractLocation(cv) {
    const PROMPT_LOCATION = "Extract the location (city name) information of the candidate from the following CV. Write only city/province name (not district, ward, ...) in Vietnam."
    
    const location = await extractData(PROMPT_LOCATION, cv);
    return location;
}

module.exports = extractLocation

// Test the function
extractLocation(CV_DEMO)
  .then((location) => {
    // console.log(location);
  })
  .catch((error) => {
    console.error(error);
  });