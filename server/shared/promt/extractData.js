const { TextServiceClient } = require("@google-ai/generativelanguage").v1beta2;
const { GoogleAuth } = require("google-auth-library");

const MODEL_NAME = "models/text-bison-001";
const API_KEY = "AIzaSyDRSSB98nK78iOssd_Mwm-vJc47foqjwZk"

const client = new TextServiceClient({
    authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

const extractData = async (prompt, cv) => {
    const combined_prompt = `${prompt} "${cv}"`
    let generatedText = "";
    try {
        const res = await client.generateText({
            model: MODEL_NAME,
            prompt: {
                text: combined_prompt,
            },
        });
        generatedText = res[0].candidates[0].output;
        return generatedText;
    } catch (err) {
        console.log(err);
        return "";
    }
}

module.exports = extractData