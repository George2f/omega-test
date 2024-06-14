import { HttpResponse, delay, http } from "msw"
import getApiClient from "../../../api/getApiClient"
import getApiBase from "../../../api/getApiBase"
import IContract from "../../types/IContract"
import IArticle from "../../types/IArticle"

export default function deleteContract({ contractId }: { contractId: number }) {
  return getApiClient()
    .delete<void>(`contracts/${contractId}`)
    .then((response) => response.data)
}

export function deleteContractMock(mockStore: {
  contracts: IContract[]
  articles: {
    [contractId: string]: IArticle[]
  }
}) {
  return http.delete(
    getApiBase() + "/contracts/:contractId",
    async ({ params }) => {
      const contractId = parseInt(params.contractId as string, 10)

      const index = mockStore.contracts.findIndex(
        (contract) => contract.id === contractId
      )

      await delay(300)
      if (index === -1) {
        return HttpResponse.json({}, { status: 404 })
      }

      mockStore.contracts.splice(index, 1)

      return HttpResponse.json({}, { status: 200 })
    }
  )
}
