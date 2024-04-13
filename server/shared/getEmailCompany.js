const puppeteer = require("puppeteer");
const extractData = require("./promt/extractData");

function findEmails(htmlContent) {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  const emails = htmlContent.match(emailRegex);
  return emails;
}

async function  testEmails(emails) {
  if (emails && emails.length > 0) {
    const PROMPT_EMAIL_SELECTION = `Among the emails mentioned below, which email is the most suitable for submitting the CV (sometime have tuyendung, hr, contract) (return only 1 email): `;
    const selectedEmail = await extractData(PROMPT_EMAIL_SELECTION, emails.join("\n"));
    return selectedEmail
  } else {
    console.log("Không có địa chỉ email để kiểm tra.");
  }
}

async function getEmailCompany(url) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const content = await page.content();
    await browser.close();

    const emails = findEmails(content);
    if (emails && emails.length > 0) {
      emails.forEach((email) => {
        console.log(email);
      });

      const selectedEmail = await testEmails(emails);
      return selectedEmail;
    } else {
      console.log("Không tìm thấy địa chỉ email.");
      return "";
    }
  } catch (error) {
    console.error("Lỗi khi lấy nội dung HTML:", error);
  }
}

module.exports = getEmailCompany

// const url = "https://tuyendung.viettel.vn/";
// getEmailCompany(url)
//   .then((selectedEmail) => {
//     console.log("Selected email:", selectedEmail);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
