import React from "react"
import PostHeader from "./PostHeader"
import Footer from "./PostFooter"
import CommentBox from "./CommentBox"
import Category from "src/components/Category"
import { ColumnChartVer } from "src/components/ColumnChartVer"
import { ColumnChartHor } from "src/components/ColumnChartHor"
import styled from "@emotion/styled"
import NotionRenderer from "../components/NotionRenderer"
import usePostQuery from "src/hooks/usePostQuery"
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight'
import { getPosts } from "src/apis"
import usePostsQuery from "src/hooks/usePostsQuery"
import { filterPosts } from "src/libs/utils/notion"
import { queryClient } from "src/libs/react-query"
import { useEffect } from "react"
import { queryKey } from "src/constants/queryKey";

type Props = {}

const PostDetail: React.FC<Props> = () => {
  const datas = usePostsQuery()
  const data = usePostQuery()
  if (!data) return null
  const CATEGORYS2 = [
    "Data Analyst",
    "Data Engineer",
    "Front-end Developer",
    "Back-end Developer",
    "Full-stack Developer",
    "Mobile Developer",
    "DevOps Engineer",
    "Data Scientist",
    "Machine Learning Engineer",
    "Software Engineer",
    "Quality Assurance/Control",
  ]

  const categoryCounts: { [key: string]: number } = {};

  const category = (data.category && data.category?.[0]) || undefined
  const number = datas.length;
  let countBelow24Months = 0;
  let countAbove24Months = 0;
    
  datas.forEach((item : any) => {
    const category = item.category;
    if (categoryCounts[category]) {
      categoryCounts[category]++;
    } else {
      categoryCounts[category] = 1;
    }
    const experience = parseInt(item.experience);
    if (experience <= 24) {
      countBelow24Months++;
    } else {
      countAbove24Months++;
    }
  });
  const CATEGORYS2COUNT = CATEGORYS2.map((category) => categoryCounts[category] || 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0); 

  let countNewApplicants = 0;
  datas.forEach((item : any) => {
    const createdTime = new Date(item.createdTime);
    createdTime.setHours(0, 0, 0, 0); 

    if (createdTime.getTime() === today.getTime()) {
      countNewApplicants++;
    }
  });
  let columnNames = ['Demand', 'Intern/Fresher', 'Others', 'New'];
  let values = [number, countBelow24Months, countAbove24Months, countNewApplicants]

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
        {data.slug === "about" ? 
        <div>
        <ColumnChartHor name = "Number of candidates in the system" columnNames={CATEGORYS2} values={CATEGORYS2COUNT}/> 
        <div><br></br></div>
        <ColumnChartVer name = "Number of candidates by category" columnNames={columnNames} values={values}/>
        </div>
        : 
        <></>}


        {data.type[0] === "Post" && <PostHeader data={data} />}
        <div>
            <ReactMarkdown>
            
          {data.recordMap}
          </ReactMarkdown>
        </div>
        
        {data.type[0] === "Post" && (
          <>
            <Footer />
            <CommentBox data={data}/>
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
