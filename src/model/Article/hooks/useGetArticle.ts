import { useQuery } from "@tanstack/react-query"
import getArticle from "../api/getArticle"

export default function useGetArticle({
  contractId,
  articleId,
}: {
  contractId: number
  articleId: number
}) {
  const { data, error, isPending } = useQuery({
    queryKey: ["article", contractId, articleId],
    queryFn: () => getArticle({ contractId, articleId }),
  })

  return { article: data, error, isPending }
}
