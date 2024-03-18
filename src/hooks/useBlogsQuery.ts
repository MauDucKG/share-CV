import { useQuery } from "@tanstack/react-query"
import { queryKey } from "src/constants/queryKey"
import { TPost } from "src/types"

const useBlogsQuery = () => {
  const { data } = useQuery({
    queryKey: queryKey.posts(),
    initialData: [] as TPost[],
    enabled: false,
  })

  if (!data) throw new Error("Posts data is not found")
  console.log(data)
  return data

}

export default useBlogsQuery
