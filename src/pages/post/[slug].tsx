import DetailPost from "src/routes/DetailPost"
import { filterPosts } from "src/libs/utils/notion"
import { CONFIG } from "site.config"
import { NextPageWithLayout } from "../../types"
import CustomError from "src/routes/Error"
import { getBlogs, getBlogMap } from "src/apis"
import MetaConfig from "src/components/MetaConfig"
import {  GetServerSideProps, GetStaticProps } from "next"
import { queryClient2 } from "src/libs/react-query"
import { queryKey } from "src/constants/queryKey"
import { dehydrate } from "@tanstack/react-query"
import useBlogQuery from "src/hooks/useBlogQuery"
import { FilterPostsOptions } from "src/libs/utils/notion/filterPosts"

const filter: FilterPostsOptions = {
  acceptStatus: ["Public", "PublicOnDetail"],
  acceptType: ["Paper", "Post", "Page"],
}

export const getStaticPaths = async () => {
  const posts = await getBlogs()
  const filteredPost = filterPosts(posts, filter)

  return {
    paths: filteredPost.map((row) => `/post/${row.slug}`),
    fallback: true,
  }
}
 
export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug

  const posts = await getBlogs()
  const feedPosts = filterPosts(posts)
  await queryClient2.prefetchQuery(queryKey.blogs(), () => feedPosts)

  const detailPosts = filterPosts(posts, filter)
  const postDetail = detailPosts.find((t: any) => t.slug === slug)
  
  const recordMap = await getBlogMap(postDetail?.slug!)
  await queryClient2.prefetchQuery(queryKey.blog(`${slug}`), () => ({
    ...postDetail,
    recordMap,
  }))
 
  return {
    props: {
      dehydratedState: dehydrate(queryClient2),
    },
    revalidate: CONFIG.revalidateTime,
  }
}

const DetailPage: NextPageWithLayout = () => {
  const post = useBlogQuery()
  if (!post || !post.type) return <CustomError />

  const image =
    post.thumbnail ??
    CONFIG.ogImageGenerateURL ??
    `${CONFIG.ogImageGenerateURL}/${encodeURIComponent(post.title)}.png`

  const date = post.date?.start_date || post.createdTime || ""
  const meta = {
    title: post.title,
    date: new Date(date).toISOString(),
    image: image,
    description: post.summary || "",
    type: post.type[0],
    url: `${CONFIG.link}/${post.slug}`,
  }

  return (
    <>
      <MetaConfig {...meta} />
      <DetailPost />
    </>
  )
}

DetailPage.getLayout = (page) => {
  return <>{page}</>
}

export default DetailPage