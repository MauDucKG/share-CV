export const queryKey = {
  scheme: () => ["scheme"],
  posts: () => ["blogs"],
  tags: () => ["tags"],
  categories: () => ["categories"],
  post: (slug: string) => ["post", slug],

}
