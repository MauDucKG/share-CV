
import {PdfReader} from "pdfreader";

var rows = {}; 

const pdfToText = async (filePath) => {
  let result = "";
  new PdfReader().parseFileItems(
    filePath,
     (err, item) => {
      if (err) clg.error(err);
      else if (!item) {
        // end of file, or page
        Object.keys(rows)
        .sort((y1, y2) => parseFloat(y1) - parseFloat(y2))
        .forEach((y) => {
          console.log((rows[y] || []).join(" "));
        });
        rows = {};
      } else if (item.text) {
        (rows[item.y] = rows[item.y] || []).push(item.text);
      }
    }
  );
}

// pdfToText("uploads/CV_LyGiaHuy_BI.pdf")
export default pdfToText;