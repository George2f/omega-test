import { HttpResponse, delay, http } from "msw"
import getApiClient from "../../../api/getApiClient"
import getApiBase from "../../../api/getApiBase"
import IContract from "../../types/IContract"
import IArticle from "../../types/IArticle"
import ITEM_STATUS_ENUM from "../../types/ItemStatusEnum"

export default function createContract({
  contract,
}: {
  contract: Partial<IContract>
}) {
  //TODO: napraviti sanitizaciju inputa
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
    contract.status = ITEM_STATUS_ENUM.CREATED
    mockStore.contracts.push(contract)
    mockStore.articles[contract.id] = []

    await delay(300)

    return HttpResponse.json({}, { status: 200 })
  })
}
