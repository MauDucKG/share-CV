// const { TextServiceClient } = require("@google-ai/generativelanguage").v1beta2;
// const { GoogleAuth } = require("google-auth-library");

// const MODEL_NAME = "models/text-bison-001";
// const API_KEY = "AIzaSyDRSSB98nK78iOssd_Mwm-vJc47foqjwZk"

// const client = new TextServiceClient({
//     authClient: new GoogleAuth().fromAPIKey(API_KEY),
// });

// const extractData = async (prompt, cv) => {
//     const combined_prompt = `${prompt} "${cv}"`
//     let generatedText = "";
//     try {
//         const res = await client.generateText({
//             model: MODEL_NAME,
//             prompt: {
//                 text: combined_prompt,
//             },
//         });
//         generatedText = res[0].candidates[0].output;
//         return generatedText;
//     } catch (err) {
//         console.log(err);
//         return "";
//     }
// }

// module.exports = extractData

const https = require('https');

async function extractData(prompt, cv) {
  const apiKey = 'AIzaSyCG5knfzDTChcWugj-Kd5YvbEtVvm3w1fs';
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

  const combined_prompt = `${prompt} "${cv}"`
  const requestPayload = {
    contents: [
      {
        parts: [
          {
            text: combined_prompt,
          },
        ],
      },
    ],
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(apiUrl, requestOptions, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          const generatedText = response.candidates[0].content.parts[0].text;
          resolve(generatedText);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(JSON.stringify(requestPayload));
    req.end();
  });
}

module.exports = extractData;

// // Test the function
// const prompt = 'Please provide a brief summary of the following CV that includes information about education, skills, experience, and language proficiency. Write a paragraph summarizing these details within approximately 300-350 characters.';
// const cv = 'This is a CV text';

// extractData(prompt, cv)
//   .then((summary) => {
//     console.log(summary);
//   })