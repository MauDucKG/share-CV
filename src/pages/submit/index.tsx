import Post from "src/routes/Post"
import MetaConfig from "src/components/MetaConfig";
import { CONFIG } from "site.config";

export default function PostPage() {
  const meta = {
    title: "Submit",
    description: CONFIG.blog.description,
    type: "website",
    url: CONFIG.link,
  };

  return (
    <>
      <MetaConfig {...meta} />
      <Post />
    </>
  );
}

