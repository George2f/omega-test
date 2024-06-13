import { HttpResponse, http } from "msw"
import getApiClient from "../../../api/getApiClient"
import getApiBase from "../../../api/getApiBase"
import IContract from "../../types/IContract"

export default function getContracts() {
  return getApiClient()
    .get<IContract[]>(`contracts`)
    .then((response) => response.data)
}

export function getContractsMock() {
  return http.get(getApiBase() + "/contracts", () => {
    return HttpResponse.json({}, { status: 200 })
  })
}
