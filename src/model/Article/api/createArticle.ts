import { HttpResponse, http } from "msw"
import getApiClient from "../../../api/getApiClient"
import IArticle from "../../types/IArticle"
import getApiBase from "../../../api/getApiBase"

export default function createArticle({
  contractId,
  article,
}: {
  contractId: number
  article: Partial<IArticle>
}) {
  return getApiClient()
    .post<IArticle>(`contracts/${contractId}/articles`, article)
    .then((response) => response.data)
}

export function createArticleMock() {
  return http.post(getApiBase() + "/contracts/:contractId/articles", () => {
    return HttpResponse.json({}, { status: 200 })
  })
}
