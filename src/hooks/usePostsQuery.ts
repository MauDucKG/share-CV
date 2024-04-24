import { useQuery } from "@tanstack/react-query"
import { queryKey } from "src/constants/queryKey"
import { TPost } from "src/types"

const usePostsQuery = () => { 
  const { data } = useQuery({
    queryKey: queryKey.posts(),
    initialData: [] as TPost[],
    refetchInterval: 5000, 
    enabled: false,
  })
  if (!data) throw new Error("Posts data is not found")
  return data
  
}

export default usePostsQuery
