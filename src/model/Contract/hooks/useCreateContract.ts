import { useMutation } from "@tanstack/react-query"
import getQueryClient from "../../../api/getQueryClient"
import createContract from "../api/createContract"

export default function useCreateContract() {
  const { mutateAsync, isPending, error, data } = useMutation({
    mutationFn: createContract,
    onSuccess: (data) => {
      getQueryClient().setQueryData(["contract", data.id], data)
      getQueryClient().invalidateQueries({ queryKey: ["contract"] })
    },
  })

  return { contract: data, createContract: mutateAsync, isPending, error }
}
