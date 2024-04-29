import React, { useEffect } from "react";
import Feed from "src/routes/Feed";
import { CONFIG } from "site.config";
import { NextPageWithLayout } from "../../types";
import { getBlogs, getPosts } from "../../apis";
import MetaConfig from "src/components/MetaConfig";
import { queryClient } from "src/libs/react-query";
import { queryKey } from "src/constants/queryKey";
import { dehydrate, hydrate, QueryClient } from "@tanstack/react-query";
import { filterPosts } from "src/libs/utils/notion";
import { FilterPostsOptions } from "src/libs/utils/notion/filterPosts";
import { loginGithub } from "src/apis";

const filter: FilterPostsOptions = {
  acceptStatus: ["Public", "PublicOnDetail"],
  acceptType: ["Paper", "Post", "Page"],
};


export async function getServerSideProps() {
  const posts = filterPosts(await getBlogs())
  await queryClient.prefetchQuery(queryKey.posts(), () => posts)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
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
      <Feed />
    </>
  );
};

export default FeedPage;