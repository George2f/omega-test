import { useQuery } from "@tanstack/react-query"
import getArticles from "../api/getArticles"

export default function useGetArticles({
  contractId,
}: {
  contractId: number
  articleId: number
}) {
  const { data, error, isPending } = useQuery({
    queryKey: ["article", contractId],
    queryFn: () => getArticles({ contractId }),
  })

  return { articles: data, error, isPending }
}
