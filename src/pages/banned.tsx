import { CONFIG } from "../../site.config"
import { NextPageWithLayout, TPosts, TTags } from "../types"
import ErrorBanned from "../routes/ErrorBanned"
import MetaConfig from "src/components/MetaConfig"

type Props = {
  tags: TTags
  posts: TPosts
}

const NotFoundPage: NextPageWithLayout<Props> = () => {
  return <ErrorBanned/>
}

NotFoundPage.getLayout = (page) => {
  return (
    <>
      <MetaConfig
        {...{
          title: CONFIG.blog.title,
          description: CONFIG.blog.description,
          type: "website",
          url: CONFIG.link,
        }}
      />
      {page}
    </>
  )
}

export default NotFoundPage
