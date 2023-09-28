/**
 * Converts the content of a PDF file to text.
 *
 * @param {string} filePath - The path to the PDF file.
 * @returns {string} - The text content within the PDF file.
 */

const fs = require('fs');
const pdf = require('pdf-parse');


const pdfToText =  (filePath) => {
    var dataBuffer = fs.readFileSync(filePath);
    var text = '';
    pdf(dataBuffer).then((data) => {
        console.log(data.text)
        text = data.text
    })
    return text
}

module.exports = { pdfToText };