import { useMutation } from "@tanstack/react-query"
import getQueryClient from "../../../api/getQueryClient"
import deleteArticle from "../api/deleteArticle"

export default function useDeleteArticle() {
  const { mutateAsync, isPending, error, data } = useMutation({
    mutationFn: deleteArticle,
    onSuccess: (data, variables) => {
      getQueryClient().setQueryData(
        ["article", variables.contractId, variables.articleId],
        data
      )
      getQueryClient().invalidateQueries({
        queryKey: ["article", variables.contractId],
      })
    },
  })

  return { article: data, deleteArticle: mutateAsync, isPending, error }
}
