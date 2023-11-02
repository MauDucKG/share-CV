import extractData from "./extractData";

async function language_md(cv) {
    const PROMT_CERTIFICATE = `Does the following CV mention the international English language test? If no data is available, write "No English qualifications listed". Extract information about the international English language test in the following CV.`
    
    const PROMPT_LANG = `Write this information into markdown style with header "#English". For example structural information:
  # English 
- Name international English language test score:  (month/year) (If No English qualifications listed, skip and only write "No English qualifications listed")
`
    const certificate = await extractData(PROMT_CERTIFICATE, cv)
    const language = await extractData(PROMPT_LANG, certificate);

    return language;
}

module.exports = language_md