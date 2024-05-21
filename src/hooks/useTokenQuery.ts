import { useQuery } from "@tanstack/react-query"
import { queryKey } from "src/constants/queryKey"

const useTokenQuery = () => { 
  const { data } = useQuery({
    queryKey: queryKey.token(),
    initialData: "" as string,
    enabled: true,
  })
  // if (!data) throw new Error("Token data is not found")
  return data
  
}

export default useTokenQuery
