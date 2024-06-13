import { HttpResponse, http } from "msw"
import getApiClient from "../../../api/getApiClient"
import getApiBase from "../../../api/getApiBase"
import IArticle from "../../types/IArticle"

export default function getArticle({
  contractId,
  articleId,
}: {
  contractId: number
  articleId: number
}) {
  return getApiClient()
    .get<IArticle>(`contracts/${contractId}/articles/${articleId}`)
    .then((response) => response.data)
}

export function getArticleMock() {
  return http.get(
    getApiBase() + "/contracts/:contractId/articles/:articleId",
    () => {
      return HttpResponse.json({}, { status: 200 })
    }
  )
}
