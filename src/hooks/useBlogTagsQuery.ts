import useBlogsQuery from "./useBlogsQuery"
import { getAllSelectItemsFromPosts } from "src/libs/utils/notion"

export const useBlogTagsQuery = () => {
  const posts = useBlogsQuery()
  const tags = getAllSelectItemsFromPosts("tags", posts)

  return tags
}
