import { HttpResponse, delay, http } from "msw"
import getApiClient from "../../../api/getApiClient"
import getApiBase from "../../../api/getApiBase"
import IContract from "../../types/IContract"
import IArticle from "../../types/IArticle"

export default function createContract({
  contract,
}: {
  contract: Partial<IContract>
}) {
  return getApiClient()
    .post<IContract>(`contracts`, contract)
    .then((response) => response.data)
}

export function createContractMock(mockStore: {
  contracts: IContract[]
  articles: {
    [contractId: string]: IArticle[]
  }
}) {
  return http.post(getApiBase() + "/contracts", async ({ request }) => {
    const contract = (await request.json()) as IContract
    const biggestId = mockStore.contracts.reduce(
      (acc, contract) => (contract.id > acc ? contract.id : acc),
      0
    )
    contract.id = biggestId + 1
    mockStore.contracts.push(contract)

    await delay(300)

    return HttpResponse.json({}, { status: 200 })
  })
}
