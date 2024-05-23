import React, { useEffect } from "react";
import FeedPost from "src/routes/FeedPost";
import { CONFIG } from "site.config";
import { NextPageWithLayout } from "../../types";
import { getBlogs, getPosts } from "../../apis";
import MetaConfig from "src/components/MetaConfig";
import { queryClient2 } from "src/libs/react-query";
import { queryKey } from "src/constants/queryKey";
import { dehydrate } from "@tanstack/react-query";
import { filterPosts } from "src/libs/utils/notion";
import { FilterPostsOptions } from "src/libs/utils/notion/filterPosts";
import { GetServerSideProps, GetStaticProps } from "next";

const filter: FilterPostsOptions = {
  acceptStatus: ["Public", "PublicOnDetail"],
  acceptType: ["Paper", "Post", "Page"],
};


export const getStaticProps: GetStaticProps = async () => {

  const posts = filterPosts(await getBlogs())
  await queryClient2.prefetchQuery(queryKey.blogs(), () => posts)

  return {
    props: {
      dehydratedState: dehydrate(queryClient2),
    },
    revalidate: CONFIG.revalidateTime,
  }
}

const FeedPage: NextPageWithLayout = () => {
  const meta = {
    title: "Post",
    description: CONFIG.blog.description,
    type: "website",
    url: CONFIG.link,
  };

  return (
    <>
      <MetaConfig {...meta} />
      <FeedPost />
    </>
  );
};

export default FeedPage;
