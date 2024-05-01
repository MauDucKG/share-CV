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
import { useEffect, useState } from "react"
import { queryKey } from "src/constants/queryKey";
import { TPost } from "src/types"
import Image from "next/image"
import loadingChartImage from 'public/loading-chart.svg';
import background from 'public/bg-header.webp'

type Props = {}

const PostDetail: React.FC<Props> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [datas, setDatas] = useState<TPost[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const posts = await getPosts();
      const filteredPosts = filterPosts(posts);
      setDatas(filteredPosts);
      setIsLoading(false)
    };

    fetchData();
    
  }, []);

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
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const currentDate = `${day}/${month}/${year}`;

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
    <div>
      {data.slug === "about" ? 
      <StyledChart>
        <section className="section-header">
          <div className="container">
            <div className="box-demand-job">
              <div className="box-demand-job_work-market">
                <div className="work-market_header">
                  <span style={{ fontFamily: 'Inter'}}>
                  💻  JOB MARKET TODAY
                  </span>
                  <span className="date" style={{ fontFamily: 'Inter'}}>{currentDate}</span>
                </div>
                <div className="work-market_content">
                  <div className="job-hiring">
                    <span>Job seekers</span>
                    <span className="quantity">
                      {number}
                    </span>
                  </div>
                  <div className="job-hiring">
                    <span>Job seekers today</span>
                    <span className="quantity">
                      {countNewApplicants}
                    </span>
                  </div>
                </div>
              </div>
              <div className="header">
                <div className="header-title">
                  <span className="caption">🕵️‍♂️ JOB DEMAND BY CATEGORY</span>
                </div>
              </div>
               {isLoading ? (
                <div className="loading-chart">
                  <div className="image-container">
                    <Image
                      className="img-responsive"
                      src={loadingChartImage}
                      alt=""
                      width={10}
                      height={10}
                    />
                  </div>
                </div>
              ) : (
                <ColumnChartVer columnNames={CATEGORYS2} values={CATEGORYS2COUNT} />
              )}
            </div>
          </div>
        </section>
        <br></br>
      </StyledChart>
      
      : 
      <></>}
      
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
              <ReactMarkdown>
              
            {data.recordMap}
            </ReactMarkdown>
          </div>
          <br></br>
          {data.category ? 
          (data.category[0] === "Blog" 
            ? (data.author ? <div style={{ textAlign: 'right' }}><em>Được sưu tầm bởi <strong> {data.author[0].name}</strong></em> <br></br><br></br></div>  : <></>)
            : <></>
          )
          : <></>}
          
          {data.type[0] === "Post" && (
            <>
              <Footer />
              <CommentBox data={data}/>
            </>
          )}
        </article>
      </StyledWrapper>
    </div>
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

const StyledChart = styled.div`
width: 100%;

.loading-chart {
  position: relative;
  width: 100%;
  height: 100%;
}

.image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.img-responsive {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.section-header {
  background-image: url(https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/welcome/bg_header.webp);
  // background-image: url(https://png.pngtree.com/thumb_back/fw800/background/20190222/ourmid/pngtree-blue-streamline-tech-background-technologytechnology-backgroundblue-backgroundbanner-image_55758.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  font-family: Inter,sans-serif;
  padding-bottom: 32px;
  padding-top: 32px
}

.box-work-market {
  background: rgba(33,47,63,.3);
  border: 1px solid transparent;
  border-radius: 6px;
  height: 172px;
  margin-bottom: 24px;
  padding: 24px;
  transition: .3s
}

.box-work-market:hover {
  border: 1px solid #11d769;
  box-shadow: 0 0 14px rgba(1,226,99,.2)
}

.section-header .box-work-market .header {
  align-items: center;
  display: flex;
  margin-bottom: 20px
}

.section-header .box-work-market .header i {
  color: #fff;
  margin-right: 12px
}

.section-header .box-work-market .header span {
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px
}

.section-header .box-work-market .header .date {
  color: #11d769;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  margin-left: 20px
}

.section-header .box-work-market .content {
  align-items: flex-start;
  display: flex;
  gap: 24px
}

.section-header .box-work-market .content .box-data-job {
  align-items: center;
  display: flex;
  flex-grow: 1;
  margin-top: 6px
}

.section-header .box-work-market .content .box-data-job .seperate {
  background: hsla(0,0%,100%,.35);
  height: 34px;
  margin-left: 24px;
  margin-right: 24px;
  opacity: .6;
  width: 1px
}

.section-header .box-work-market .content .box-data-job .job-hiring p,.section-header .box-work-market .content .box-data-job .job-new p {
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  margin-bottom: 8px
}

.section-header .box-work-market .content .box-data-job .job-hiring .box-quantity,.section-header .box-work-market .content .box-data-job .job-new .box-quantity {
  align-items: center;
  display: flex
}

.section-header .box-work-market .content .box-data-job .job-hiring .box-quantity span,.section-header .box-work-market .content .box-data-job .job-new .box-quantity span {
  color: #11d769;
  font-size: 28px;
  font-weight: 600;
  line-height: 40px
}

.section-header .box-work-market .content .box-data-job .job-hiring .box-quantity .status,.section-header .box-work-market .content .box-data-job .job-new .box-quantity .status {
  align-items: center;
  background: rgba(17,215,105,.1);
  border-radius: 20px;
  display: flex;
  height: 32px;
  justify-content: center;
  margin-left: 12px;
  width: 32px
}

.section-header .box-work-market .content .box-data-job .job-hiring .box-quantity .status i,.section-header .box-work-market .content .box-data-job .job-new .box-quantity .status i {
  color: #11d769;
  font-size: 14px;
  font-weight: 900;
  line-height: 20px
}

.section-header .box-work-market .content .box-data-job .job-hiring .box-quantity.up span,.section-header .box-work-market .content .box-data-job .job-new .box-quantity.up span {
  color: #11d769
}

.section-header .box-work-market .content .box-data-job .job-hiring .box-quantity.up .status,.section-header .box-work-market .content .box-data-job .job-new .box-quantity.up .status {
  background: rgba(17,215,105,.1)
}

.section-header .box-work-market .content .box-data-job .job-hiring .box-quantity.up .status i,.section-header .box-work-market .content .box-data-job .job-new .box-quantity.up .status i {
  color: #11d769
}

.section-header .box-work-market .content .box-data-job .job-hiring .box-quantity.down span,.section-header .box-work-market .content .box-data-job .job-new .box-quantity.down span {
  color: #fff
}

.section-header .box-work-market .content .box-data-job .job-hiring .box-quantity.down .status,.section-header .box-work-market .content .box-data-job .job-new .box-quantity.down .status {
  background: hsla(0,0%,100%,.15)
}

.section-header .box-work-market .content .box-data-job .job-hiring .box-quantity.down .status i,.section-header .box-work-market .content .box-data-job .job-new .box-quantity.down .status i {
  color: #fff;
  transform: scaleY(-1)
}

.section-header .box-work-market .content .box-data-job .job-hiring .box-quantity .loading,.section-header .box-work-market .content .box-data-job .job-new .box-quantity .loading {
  height: 40px;
  width: 90px
}

.section-header .box-work-market .content .box-data-job .job-new .box-quantity {
  justify-content: center
}

.section-header .box-work-market .content .img-robot {
  height: 80px;
  width: 65px
}

.section-header .box-demand-job {
  margin-left: 8px;
  margin-right: 8px;
  background: rgba(33,47,63,.3);
  border: 1px solid transparent;
  border-radius: 12px;
  overflow: hidden;
  padding: 16px 24px;
  position: relative;
  transition: .3s
}

.section-header .box-demand-job:hover {
  border: 1px solid #11d769;
  box-shadow: 0 0 14px rgba(1,226,99,.2)
}

.section-header .box-demand-job:hover .box-load-more {
  top: 88%
}

.section-header .box-demand-job .header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px
}

.section-header .box-demand-job .header i {
  color: #fff;
  margin-right: 12px
}

.section-header .box-demand-job .header img {
  width: 24px
}

.section-header .box-demand-job .header .caption {
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  font-family: 'Inter'
}

.section-header .box-demand-job .header-title {
  align-items: center;
  display: flex;
  gap: 8px
}

.section-header .box-demand-job .loading-chart {
  height: 180px
}

.section-header .box-demand-job .box-chart {
  display: none;
  transition: .3s
}

.section-header .box-demand-job .box-load-more {
  background: #1b6748;
  border: 1px solid var(--accent-primary-60,#00b14f);
  border-bottom: none;
  border-radius: 10px 0 0 0;
  border-right: none;
  bottom: 0;
  cursor: pointer;
  margin-top: 12px;
  padding: 5px 9px 5px 11px;
  position: absolute;
  right: 0;
  text-align: center;
  top: 100%;
  transition: all .3s ease-out
}

.section-header .box-demand-job .box-load-more a {
  color: #11d769;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px
}

.section-header .box-demand-job .box-load-more i {
  color: #11d769;
  font-size: 13px;
  font-weight: 900;
  line-height: 20px;
  margin-left: 4px
}

.section-header .box-demand-job .box-load-more:hover {
  background: var(--accent-primary-60,#00b14f);
  color: #fff!important;
  font-size: 12px;
  font-weight: 500;
  line-height: 20px
}

.section-header .box-demand-job .box-load-more:hover a,.section-header .box-demand-job .box-load-more:hover i {
  color: #fff!important
}

.section-header .box-demand-job #htmlLegendDemandJobHomePage {
  margin-top: 20px;
  min-height: 52px
}

.section-header .box-demand-job #htmlLegendDemandJobHomePage .item {
  align-items: center;
  display: flex;
  float: left;
  margin-bottom: 10px;
  width: 33.33%
}

.section-header .box-demand-job #htmlLegendDemandJobHomePage .item .color {
  border-radius: 2px;
  height: 4px;
  margin-right: 8px;
  width: 12px
}

.section-header .box-demand-job #htmlLegendDemandJobHomePage .item .text {
  color: hsla(0,0%,100%,.7);
  display: block;
  font-family: Inter,sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 80%
}

.section-header .box-demand-job .box-select {
  position: relative
}

.section-header .box-demand-job .box-select select {
  align-items: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: linear-gradient(178.55deg,rgba(0,177,79,0) 10.22%,rgba(0,146,65,.22) 98.77%);
  border: 1px solid #11d769;
  border-radius: 4px;
  color: #11d769;
  display: flex!important;
  font-size: 14px;
  font-weight: 600;
  height: 36px!important;
  line-height: 20px;
  padding: 8px 10px;
  text-indent: 1px;
  text-overflow: "";
  width: 165px
}

.section-header .box-demand-job .select2-container {
  height: 36px!important;
  width: 132px!important
}

.section-header .box-demand-job .select2-selection--single {
  align-items: center;
  background: linear-gradient(178.55deg,rgba(0,177,79,0) 10.22%,rgba(0,146,65,.22) 98.77%);
  border: 1px solid #11d769;
  border-radius: 6px;
  display: flex!important;
  height: 100%!important;
  padding: 8px 12px
}

.section-header .box-demand-job .select2-selection--single:hover {
  border: 1px solid #11d769!important
}

.box-demand-job_work-market {
  margin-bottom: 16px
}

.box-demand-job_work-market .work-market_header {
  align-items: center;
  color: #fff;
  display: flex;
  justify-content: space-between;
  margin-bottom: 22px
}

.box-demand-job_work-market .work-market_header span {
  color: #fff;
  display: flex;
  font-size: 14px;
  font-weight: 600;
  gap: 8px;
  letter-spacing: .175px;
  line-height: 22px
  font-family: 'Inter'
}

.box-demand-job_work-market .work-market_header span img {
  width: 24px
}

.box-demand-job_work-market .work-market_header span.date {
  color: #11d769
}

.box-demand-job_work-market .work-market_content {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  margin: 0 8px 18px
}

.box-demand-job_work-market .work-market_content .job-hiring {
  display: flex;
  gap: 8px
}

.box-demand-job_work-market .work-market_content .job-hiring span {
  font-feature-settings: "clig" off,"liga" off;
  color: #fff;  
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: .175px;
  line-height: 22px
}

.section-header .box-demand-job_work-market .work-market_content .job-hiring span.quantity {
  color: #11d769
}

.section-header .box-demand-job_work-market .work-market_content .job-hiring:nth-of-type(2n) {
  justify-content: end
}

.section-header .box-demand-job_work-market .work-market_content .job-hiring:nth-of-type(odd) {
  border-image-slice: 1;
  border-image-source: linear-gradient(90deg,rgba(17,215,105,0),#11d769 51.04%,rgba(17,215,105,0));
  border-right: 1px solid;
  position: relative
}

.section-header .box-demand-job_work-market .work-market_content .job-hiring:nth-of-type(odd):after {
  align-self: center;
  background: linear-gradient(90deg,rgba(17,215,105,0),#11d769 51.04%,rgba(17,215,105,0));
  content: "";
  height: 2px;
  opacity: .6000000238;
  position: absolute;
  right: -34px;
  transform: rotate(90deg);
  width: 34px
}

.section-header .box-demand-job_work-market .work-market_content .job-hiring .status {
  align-items: center;
  background: rgba(17,215,105,.1);
  border-radius: 15px;
  color: #11d769;
  display: flex;
  height: 24px;
  justify-content: center;
  padding: 6px;
  width: 24px
}

.section-header .box-demand-job_work-market .work-market_content .job-hiring .status i {
  font-size: 12px
}

.section-header .box-demand-job_work-market .work-market_content .job-hiring .status.down i {
  transform: scaleY(-1)
}

.section-header .box-demand-job_work-market:after {
  background: linear-gradient(90deg,rgba(17,215,105,0),#11d769 50%,rgba(17,215,105,0));
  content: "";
  display: block;
  height: 2px;
  opacity: .6000000238
}

.block-chart .select2-container--below.select2-container--open .select2-selection--single .select2-selection__arrow b:after {
  transform: rotate(180deg)
}

.block-chart .select2-container--default .select2-selection--single .select2-selection__arrow b {
  border: none!important
}

.block-chart .select2-container--default .select2-selection--single .select2-selection__arrow b:after {
  background-image: url(data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0nMTgnIGhlaWdodD0nMTEnIGZpbGw9J25vbmUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZD0nTTE2LjkyIDEuOTUgMTAuNCA4LjQ3Yy0uNzcuNzctMi4wMy43Ny0yLjggMEwxLjA4IDEuOTUnIHN0cm9rZT0nIzAwQjE0Ricgc3Ryb2tlLXdpZHRoPScyJyBzdHJva2UtbWl0ZXJsaW1pdD0nMTAnIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcvPjwvc3ZnPg==);
  background-repeat: no-repeat;
  background-size: contain;
  content: "";
  display: block;
  height: 8px;
  position: absolute;
  right: -5px;
  top: -3px;
  width: 12px
}

@media(min-width: 1100px) {
  .section-header .lis-column {
      display:flex;
      justify-content: space-between
  }

  .section-header .lis-column .col:first-of-type {
      width: 542px
  }

  .section-header .lis-column .col:last-of-type {
      width: 571px
  }
}

    `

