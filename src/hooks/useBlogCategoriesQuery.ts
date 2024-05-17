import { DEFAULT_CATEGORY } from "src/constants"
import useBlogsQuery from "./useBlogsQuery"
import { getAllSelectItemsFromPosts } from "src/libs/utils/notion"

export const useBlogCategoriesQuery = () => {
  const posts = useBlogsQuery()
  const categories = getAllSelectItemsFromPosts("category", posts)

  return {
    [DEFAULT_CATEGORY]: posts.length,
    ...categories,
  }
}
