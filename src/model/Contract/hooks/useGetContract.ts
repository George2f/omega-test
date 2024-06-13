import { useQuery } from "@tanstack/react-query"
import getContract from "../api/getContract"

export default function useGetContract({ contractId }: { contractId: number }) {
  const { data, error, isPending } = useQuery({
    queryKey: ["contract", contractId],
    queryFn: () => getContract({ contractId }),
  })

  return { contract: data, error, isPending }
}
