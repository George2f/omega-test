import { useMutation } from "@tanstack/react-query"
import createArticle from "../api/createArticle"
import getQueryClient from "../../../api/getQueryClient"

export default function useCreateArticle() {
  const { mutateAsync, isPending, error, data } = useMutation({
    mutationFn: createArticle,
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

  return { article: data, createArticle: mutateAsync, isPending, error }
}
