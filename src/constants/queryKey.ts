export const queryKey = {
  scheme: () => ["scheme"],
  posts: () => ["posts"],
  blogs: () => ["blogs"],
  tags: () => ["tags"],
  categories: () => ["categories"],
  post: (slug: string) => ["post", slug],
  blog: (slug: string) => ["blog", slug],
}
