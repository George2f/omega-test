import { useMutation } from "@tanstack/react-query"
import getQueryClient from "../../../api/getQueryClient"
import updateContract from "../api/updateContract"

export default function useUpdateContract() {
  const { mutateAsync, isPending, error, data } = useMutation({
    mutationFn: updateContract,
    onSuccess: (data) => {
      getQueryClient().setQueryData(["contract", data.id], data)
      getQueryClient().invalidateQueries({ queryKey: ["contract"] })
    },
  })

  return { contract: data, updateContract: mutateAsync, isPending, error }
}
