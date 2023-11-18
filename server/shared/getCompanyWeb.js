const axios = require('axios');
const { JSDOM } = require('jsdom');

async function getWebsiteLink(url) {
  try {
    const response = await axios.get(url);
    const htmlContent = response.data;

    const dom = new JSDOM(htmlContent);
    const document = dom.window.document;

    const h3Tags = document.getElementsByTagName('h3');

    for (let i = 0; i < h3Tags.length; i++) {
      const tag = h3Tags[i];
      if (tag.textContent.toLowerCase().includes('website')) {
        const parentTag = tag.parentNode;
        const websiteLink = parentTag.querySelector('a').getAttribute('href');
        return websiteLink;
      }
    }

    return null;
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}

module.exports = getWebsiteLink

// Usage: Get the website link from the URL
const url = 'https://topdev.vn/companies/viettel-group-84011';
getWebsiteLink(url)
  .then((websiteLink) => {
    if (websiteLink) {
      console.log('Liên kết website:', websiteLink);
    } else {
      console.log('Không tìm thấy liên kết website.');
    }
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });