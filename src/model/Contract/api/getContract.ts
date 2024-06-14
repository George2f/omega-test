import { HttpResponse, delay, http } from "msw"
import getApiClient from "../../../api/getApiClient"
import getApiBase from "../../../api/getApiBase"
import IContract from "../../types/IContract"
import IArticle from "../../types/IArticle"

export default function getContract({ contractId }: { contractId: number }) {
  return getApiClient()
    .get<IContract>(`contracts/${contractId}`)
    .then((response) => response.data)
}

export function getContractMock(mockStore: {
  contracts: IContract[]
  articles: {
    [contractId: string]: IArticle[]
  }
}) {
  return http.get(
    getApiBase() + "/contracts/:contractId",
    async ({ params }) => {
      const contractId = parseInt(params.contractId as string, 10)
      const contract = mockStore.contracts.find(
        (contract) => contract.id === contractId
      )

      await delay(300)
      if (!contract) {
        return HttpResponse.json({}, { status: 404 })
      }

      return HttpResponse.json(contract, { status: 200 })
    }
  )
}
