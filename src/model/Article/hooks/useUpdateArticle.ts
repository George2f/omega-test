import { useMutation } from "@tanstack/react-query"
import getQueryClient from "../../../api/getQueryClient"
import updateArticle from "../api/updateArticle"

export default function useUpdateArticle() {
  const { mutateAsync, isPending, error, data } = useMutation({
    mutationFn: updateArticle,
    onSuccess: (data, variables) => {
      getQueryClient().setQueryData(
        ["article", variables.contractId, data.id],
        data
      )
      getQueryClient().invalidateQueries({
        queryKey: ["article", variables.contractId],
      })
    },
  })

  return { article: data, updateArticle: mutateAsync, isPending, error }
}
