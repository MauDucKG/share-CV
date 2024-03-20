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

// const fetch = require('node-fetch');

// async function extractData(prompt, cv) {
//   const apiKey = 'AIzaSyDRSSB98nK78iOssd_Mwm-vJc47foqjwZk';
//   const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

//   const combined_prompt = `${prompt} "${cv}"`
//   const requestPayload = {
//     contents: [
//       {
//         parts: [
//           {
//             text: combined_prompt,
//           },
//         ],
//       },
//     ],
//   };

//   const requestOptions = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(requestPayload),
//   };

//   try {
//     const response = await fetch(apiUrl, requestOptions);
//     const data = await response.json();
//     // console.log(data.candidates[0].content.parts[0].text);
//     generatedText = data.candidates[0].content.parts[0].text
//     return generatedText
//   } catch (error) {
//     console.error(error);
//   }
// }

// module.exports = extractData