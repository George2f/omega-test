import { HttpResponse, delay, http } from "msw"
import getApiClient from "../../../api/getApiClient"
import getApiBase from "../../../api/getApiBase"
import IContract from "../../types/IContract"
import IArticle from "../../types/IArticle"

export default function getContracts() {
  return getApiClient()
    .get<IContract[]>(`contracts`)
    .then((response) => response.data)
}

export function getContractsMock(mockStore: {
  contracts: IContract[]
  articles: {
    [contractId: string]: IArticle[]
  }
}) {
  return http.get(getApiBase() + "/contracts", async () => {
    await delay(300)
    console.log("mockStore.contracts", mockStore.contracts)
    return HttpResponse.json(mockStore.contracts, { status: 200 })
  })
}
