import { HttpResponse, http } from "msw"
import getApiClient from "../../../api/getApiClient"
import getApiBase from "../../../api/getApiBase"

export default function deleteContract({ contractId }: { contractId: number }) {
  return getApiClient()
    .delete<void>(`contracts/${contractId}`)
    .then((response) => response.data)
}

export function deleteContractMock() {
  return http.delete(getApiBase() + "/contracts/:contractId", () => {
    return HttpResponse.json({}, { status: 200 })
  })
}
