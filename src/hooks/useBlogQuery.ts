import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { queryKey } from "src/constants/queryKey"
import { PostDetail } from "src/types"

const useBlogQuery = () => {
  const router = useRouter()
  const { slug } = router.query
  
  const { data } = useQuery<PostDetail>({
    queryKey: queryKey.blog(`${slug}`),
    enabled: true,
  })
    
  return data
}

export default useBlogQuery
