import { HttpResponse, http } from "msw"
import getApiClient from "../../../api/getApiClient"
import getApiBase from "../../../api/getApiBase"
import IContract from "../../types/IContract"

export default function updateContract({ contract }: { contract: IContract }) {
  return getApiClient()
    .put<IContract>(`contracts/${contract.id}`, contract)
    .then((response) => response.data)
}

export function updateContractMock() {
  return http.put(getApiBase() + "/contracts/:contractId", () => {
    return HttpResponse.json({}, { status: 200 })
  })
}
