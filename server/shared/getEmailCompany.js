const fetch = require('node-fetch');

async function getHtmlContent(url) {
  const response = await fetch(url);
  const htmlContent = await response.text();
  return htmlContent;
}

function findEmails(htmlContent) {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  const emails = htmlContent.match(emailRegex);
  return emails;
}

function testEmails(emails) {
  if (emails && emails.length > 0) {
    console.log("Đang kiểm tra các địa chỉ email:");
    emails.forEach((email) => {
      console.log(email);
      // Thực hiện các kiểm tra email tại đây
    });
  } else {
    console.log("Không có địa chỉ email để kiểm tra.");
  }
}

// Sử dụng hàm để lấy HTML từ liên kết
const url = "https://tuyendung.viettel.vn/";
getHtmlContent(url)
  .then((htmlContent) => {
    // Tìm các địa chỉ email trong nội dung HTML
    const emails = findEmails(htmlContent);

    // In ra danh sách các địa chỉ email tìm được
    if (emails && emails.length > 0) {
      console.log("Các địa chỉ email có thể có trong trang HTML:");
      emails.forEach((email) => {
        console.log(email);
      });

      // Kiểm tra các địa chỉ email
      testEmails(emails);
    } else {
      console.log("Không tìm thấy địa chỉ email.");
    }
  })
  .catch((error) => {
    console.error("Lỗi khi lấy nội dung HTML:", error);
  });