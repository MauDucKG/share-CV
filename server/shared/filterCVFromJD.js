const { CV_DEMO, JD_DEMO, TAGS1, TAGS2, CATEGORYS2 } = require("./const")
const extractData = require("./promt/extractData")
const extractDataFromCV = require("./extractDataFromCV")
const extractDataFromJD = require("./extractDataFromJD")

async function calculateTagSimilarity(jdTags, cvTags) {
    const commonTags = jdTags.filter(tag => cvTags.includes(tag));
    const similarityPercentage = (commonTags.length / jdTags.length) * 100;
    console.log(similarityPercentage)
    return similarityPercentage;
}

async function filterCVFromJD(jdText, cvText, cvCategory) {
    try {
        const jdData = await extractDataFromJD(jdText);
        const cvData = await extractDataFromCV(cvText, cvCategory);

        const minExp = parseInt(jdData.min_exp);
        const maxExp = parseInt(jdData.max_exp);
        const cvExp = parseInt(cvData.experience);

        if (cvExp >= minExp && cvExp <= maxExp) {
            const jdTags = jdData.tags1;
            console.log(jdTags)
            const cvTags = cvData.tags;
            console.log(cvTags)

            // Calculate %
            const similarityPercentage = await calculateTagSimilarity(jdTags, cvTags);

            // % match
            const similarityThreshold = 50;

            if (similarityPercentage >= similarityThreshold) {
                return true; 
            }

        }

        return false; 
    } catch (error) {
        console.error("Error filtering CV from JD:", error);
        return false;
    }
}

const jdText = JD_DEMO;
const cvText = CV_DEMO;
const cvCategory = "SW Developer";

filterCVFromJD(jdText, cvText, cvCategory).then((isMatch) => {
    if (isMatch) {
    console.log("CV matches JD");
    } else {
    console.log("CV does not match JD");
    }
});

