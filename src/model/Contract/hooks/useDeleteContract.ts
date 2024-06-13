import { useMutation } from "@tanstack/react-query"
import getQueryClient from "../../../api/getQueryClient"
import deleteContract from "../api/deleteContract"

export default function useDeleteContract() {
  const { mutateAsync, isPending, error, data } = useMutation({
    mutationFn: deleteContract,
    onSuccess: (data, variables) => {
      getQueryClient().setQueryData(["contract", variables.contractId], data)
      getQueryClient().invalidateQueries({ queryKey: ["contract"] })
    },
  })

  return { contract: data, deleteContract: mutateAsync, isPending, error }
}
