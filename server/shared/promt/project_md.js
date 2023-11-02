import extractData from "./extractData";

async function project_md(cv) {
    const PROMPT_PROJECT = `Among the projects that the candidate mentioned in the following CV, please extract all information about the 2 projects most relevant to the job ${cv_category}. Write this information into markdown style with header "#Project". For example structural information:
  # Project
- **Name project 1**
  * Description 1
  * Description 2
- **Name project 2**
  * Description 1
  * Description 2
(This is just an example paragraph, and the information from the following CV needs to be replaced.)

  `

    const project = await extractData(PROMPT_PROJECT, cv)

    return project;
}

module.exports = project_md