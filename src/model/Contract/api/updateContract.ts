import { HttpResponse, delay, http } from "msw"
import getApiClient from "../../../api/getApiClient"
import getApiBase from "../../../api/getApiBase"
import IContract from "../../types/IContract"
import IArticle from "../../types/IArticle"

export default function updateContract({ contract }: { contract: IContract }) {
  return getApiClient()
    .put<IContract>(`contracts/${contract.id}`, contract)
    .then((response) => response.data)
}

export function updateContractMock(mockStore: {
  contracts: IContract[]
  articles: {
    [contractId: string]: IArticle[]
  }
}) {
  return http.put(
    getApiBase() + "/contracts/:contractId",
    async ({ request, params }) => {
      const contractId = parseInt(params.contractId as string, 10)
      const contract = (await request.json()) as IContract
      const index = mockStore.contracts.findIndex(
        (contract) => contract.id === contractId
      )
      mockStore.contracts[index] = contract

      await delay(300)
      return HttpResponse.json(contract, { status: 200 })
    }
  )
}
