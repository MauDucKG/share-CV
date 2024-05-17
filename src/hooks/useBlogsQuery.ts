import { useQuery } from "@tanstack/react-query"
import { queryKey } from "src/constants/queryKey"
import { TPost } from "src/types"

const useBlogsQuery = () => { 
  const { data } = useQuery({
    queryKey: queryKey.blogs(),
    initialData: [] as TPost[],
    enabled: true,
  })
  if (!data) throw new Error("Posts data is not found")
  return data
  
}

export default useBlogsQuery
