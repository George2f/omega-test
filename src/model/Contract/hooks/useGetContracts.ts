import { useQuery } from "@tanstack/react-query"
import getContracts from "../api/getContracts"

//TODO: dodati paginaciju
export default function useGetContracts() {
  const { data, error, isPending } = useQuery({
    queryKey: ["contract"],
    queryFn: () => getContracts(),
  })

  return { contracts: data, error, isPending }
}
