import Detail from "src/routes/Detail"
import { filterPosts } from "src/libs/utils/notion"
import { CONFIG } from "site.config"
import { NextPageWithLayout } from "../../types"
import CustomError from "src/routes/Error"
import { getRecordMap, getPosts, getBlogs, getAll } from "src/apis"
import MetaConfig from "src/components/MetaConfig"
import { GetStaticProps } from "next"
import { queryClient } from "src/libs/react-query"
import { queryKey } from "src/constants/queryKey"
import { dehydrate } from "@tanstack/react-query"
import usePostQuery from "src/hooks/usePostQuery"
import { FilterPostsOptions } from "src/libs/utils/notion/filterPosts"
import { LINK_TO_REGISTER, LINK_TO_RECEIVE, LINK_TO_POST, LINK_TO_SUBMIT, LINK_TO_LOGIN, usePath } from "src/constants"
import Register from "src/routes/Register"
import Receive from "src/routes/Receive"
import Post from "src/routes/Post"
import Login from "src/routes/Login"
import Feed from "src/routes/Feed"

const filter: FilterPostsOptions = {
  acceptStatus: ["Public", "PublicOnDetail"],
  acceptType: ["Paper", "Post", "Page"],
}

export const getStaticPaths = async () => {
  const posts = await getPosts()
  const filteredPost = filterPosts(posts, filter)

  return {
    // paths: filteredPost.map((row) => usePath ? `/post/${row.slug}` : `/post/${row.slug}`),
    paths: filteredPost.map((row) => `/post/${row.slug}`),
    fallback: true,
  }
}
 
export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug
  const posts = await getAll()  
  const feedPosts = filterPosts(posts)
  await queryClient.prefetchQuery(queryKey.posts(), () => feedPosts)
  if (slug === LINK_TO_POST) {
    const posts = await getBlogs()
    const feedPosts = filterPosts(posts)
    await queryClient.prefetchQuery(queryKey.posts(), () => feedPosts)
  }
  const detailPosts = filterPosts(posts, filter)
  const postDetail = detailPosts.find((t: any) => t.slug === slug)
  
  const recordMap = await getRecordMap(postDetail?.slug!)
  await queryClient.prefetchQuery(queryKey.post(`${slug}`), () => ({
    ...postDetail,
    recordMap,
  }))
 
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: CONFIG.revalidateTime,
  }
}

const DetailPage: NextPageWithLayout = () => {
  const post = usePostQuery()
  if (!post) return <CustomError />

  if (post.slug === LINK_TO_REGISTER) return <Register />

  if (post.slug === LINK_TO_RECEIVE) return <Receive />
  
  if (post.slug === LINK_TO_SUBMIT) return <Post />

  if (post.slug === LINK_TO_LOGIN) return <Login />

  if (post.slug === LINK_TO_POST) return <Feed />
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
      <Detail />
    </>
  )
}

DetailPage.getLayout = (page) => {
  return <>{page}</>
}

export default DetailPage
