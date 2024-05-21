export const queryKey = {
  scheme: () => ["scheme"],
  posts: () => ["posts"],
  token: () => ["token"],
  userdata: () => ["userdata"],
  blogs: () => ["blogs"],
  tags: () => ["tags"],
  categories: () => ["categories"],
  post: (slug: string) => ["post", slug],
  blog: (slug: string) => ["blog", slug],
}
