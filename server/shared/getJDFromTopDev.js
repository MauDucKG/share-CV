const getWebsiteLink = require('./getCompanyWeb')
const getEmailCompany = require('./getEmailCompany')

async function getJDFromTopDev() {
  const requests = require('axios');

  const url = "https://api.topdev.vn/td/v2/jobs";
  const params = {
    "fields[job]": "id,title,skills_arr,requirements_arr,company",
    "fields[company]": "slug,addresses",
    "page": 1,
    "locale": "en_US",
    "ordering": "jobs_new"
  };

  const response = await requests.get(url, { params });
  const data = response.data;

  const parsed_data = data['data'];
  const result = [];

  for (const item of parsed_data) {
    let entry = {
      "id": item["id"],
      "title": item["title"],
      "skills_arr": item["skills_arr"],
      "requirements_arr": item["requirements_arr"],
      "detail_url": item["company"]["detail_url"],
      "url_company": await getWebsiteLink(item["company"]["detail_url"]),
      "requirements": item["requirements_arr"].map(req => req.value.join(", ")).join(", ") + ", Key word is: " + item["skills_arr"].join(", "),
      "email_company": "",
      "address_short_region_list": item["company"]["addresses"]["address_short_region_list"],
    };
    entry.email_company = await getEmailCompany(entry.url_company),
    result.push(entry);
  }

  return result
}

// Test case
getJDFromTopDev()
  .then((data) => {
    console.log("Job data:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });