import React from "react"
import PostHeader from "./PostHeader"
import Footer from "./PostFooter"
import CommentBox from "./CommentBox"
import Category from "src/components/Category"
import styled from "@emotion/styled"
import NotionRenderer from "../components/NotionRenderer"
import usePostQuery from "src/hooks/usePostQuery"
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight'

type Props = {}

const PostDetail: React.FC<Props> = () => {
  const data = usePostQuery()
  const markdownText = `
  # NGUYỄN MẬU MINH ĐỨC - Mobile Developer

📞 0868959482 📧 nguyenmauduc91@gmail.com 🌐 [GitHub ↗](https://mauduckg.github.io/CV)

📍 District9, Ho Chi Minh, Vietnam 🌐 [LinkedIn](linkedin.com/in/mauduckg/) 🌐 [GitHub ↗](https://github.com/MauDucKG)

## Introduction

I am currently a final year student majoring in Computer Science, expecting to graduate in 2024. From September to December 2023, I am available to work 4 days a week. Starting from January 2024, I can work full-time. I am highly interested in the field of Mobile Development (Fullstack). I would like to mention that I am open to working full-time if it is possible to work remotely on the days I have classes at school.

### Education 🎓

Ho Chi Minh City University of Technology (Trường Đại học Bách khoa HCM)

2020 - Now

- GPA: 3.2/4.
- Score for Developing applications on mobile devices course: 9.2.

### Work Experience 💼

Cybozu Việt Nam

Web Programming Intern

June 2022 - August 2022

- Experienced professional workflow and accumulated a lot of knowledge in the field of programming.

IASLab

Research student

July 2022 - January 2023

- Explored machine learning topics with Professor Vo Thanh Hung (HCMUT) [IASLab ↗](https://thanhhungqb.github.io/iaslab/)

### Projects 🚀

#### INTERDISCIPLINARY PROJECT - SmartClock

March 2023 - April 2023

Mobile Developer, AI Engineering

- Designed a smart door lock system with facial recognition unlocking capability, which includes information management through mobile devices (using React Native).
- Demo: [SmartClock Demo ↗](https://www.youtube.com/watch?v=AUWZY5k5QEA).
- Details: [SmartClock GitHub ↗](https://github.com/MauDucKG/DADN_TTNT_HK222_DHA).
- Keywords: React Native, Nodejs, IOT, Mobile, Face Recognition.

#### SMART BUS CATCHING APPLICATION - BusPlus

April 2023 - May 2023

Mobile Developer

- Collaborated with Team Lemon (4 members) to develop and deploy a smart bus catching application that includes social audio networking and task management features (for use during bus rides to enhance the user experience).
- Responsible for designing some UI screens, calling APIs, and developing the backend.
- Details: [BusPlus GitHub ↗](https://github.com/MauDucKG/BusPlus/tree/main/documents).
- Demo: [BusPlus Demo ↗](https://expo.dev/@mauduckg/app?serviceType=classic&distribution=expo-go).
- Keywords: React Native, Nodejs, API.

#### MOBILE APP FOR TRACKING COVID-19 CASES

March 2022 - April 2022

Mobile Developer

- Created a Flutter mobile app to display Covid-19 cases globally, by country, and by province in Vietnam.
- The app fetches data using APIs for global and country data and HTML parsing for Vietnam data.
- Demo: [COVID-19 Tracker ↗](https://mauduckg.github.io/CV/demo.html)
- Keywords: Flutter, API.

### Skills 💪

- Programming languages: **C++, Python, Haskell**
- Programming paradigms: **OOP, Functional Programming**
- Web development: **HTML, CSS, PHP, React, Nodejs**
- Mobile Developer: **React Native**
- Data programming: **SQL, MySQL, MongoDB**

Keywords: Mobile Development, Fullstack, React Native, Nodejs, IOT, Face Recognition, API, Flutter, HTML, CSS, PHP, Python, SQL, MySQL, MongoDB.

© topcv.vn
  `;

  if (!data) return null

  const category = (data.category && data.category?.[0]) || undefined

  return (
    <StyledWrapper>
      <article className="markdown">
        {category && (
          <div css={{ marginBottom: "0.5rem" }}>
            <Category readOnly={data.status?.[0] === "PublicOnDetail"}>
              {category}
            </Category>
          </div>
        )}
        {data.type[0] === "Post" && <PostHeader data={data} />}
        <div>
          {/* <NotionRenderer recordMap={data.recordMap} /> */}
            <ReactMarkdown>{markdownText}</ReactMarkdown>
        </div>
        {data.type[0] === "Post" && (
          <>
            <Footer />
            <CommentBox data={data} />
          </>
        )}
      </article>
    </StyledWrapper>
  )
}

export default PostDetail

const StyledWrapper = styled.div`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
  border-radius: 1.5rem;
  max-width: 56rem;
  background-color: ${({ theme }) =>
    theme.scheme === "light" ? "white" : theme.colors.gray4};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin: 0 auto;
  > article {
    margin: 0 auto;
    max-width: 42rem;
  }
`
