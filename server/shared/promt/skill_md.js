import extractData from "./extractData";

async function skill_md(cv) {
    const PROMPT_SKILL = `Extract information from the CV about the candidate's skills (programming skills) for job ${cv_category}. If no data is available, skip. Write this information into markdown style with header "#Skill". For example:
  # Skills

* Programming languages:
  * Description (If no data is available, skip and write No data)
* Programming paradigms:
  * Description (If no data is available, skip and write No data)
* Web development:
  * Description (If no data is available, skip and write No data)
* Mobile development:
  * Description (If no data is available, skip and write No data)
* Data programming:
  * Description (If no data is available, skip and write No data)
(This is just an example paragraph, and the information from the following CV needs to be replaced.)

`

    const skill = await extractData(PROMPT_SKILL, cv)

    return skill;
}

module.exports = skill_md