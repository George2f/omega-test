import { HttpResponse, http } from "msw"
import getApiClient from "../../../api/getApiClient"
import getApiBase from "../../../api/getApiBase"
import IContract from "../../types/IContract"

export default function getContract({ contractId }: { contractId: number }) {
  return getApiClient()
    .get<IContract>(`contracts/${contractId}`)
    .then((response) => response.data)
}

export function getContractMock() {
  return http.get(getApiBase() + "/contracts/:contractId", () => {
    return HttpResponse.json({}, { status: 200 })
  })
}
