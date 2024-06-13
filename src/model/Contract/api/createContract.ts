import { HttpResponse, http } from "msw"
import getApiClient from "../../../api/getApiClient"
import getApiBase from "../../../api/getApiBase"
import IContract from "../../types/IContract"

export default function createContract({
  contract,
}: {
  contract: Partial<IContract>
}) {
  return getApiClient()
    .post<IContract>(`contracts`, contract)
    .then((response) => response.data)
}

export function createContractMock() {
  return http.post(getApiBase() + "/contracts", () => {
    return HttpResponse.json({}, { status: 200 })
  })
}
