import { HttpResponse, http } from "msw"
import getApiClient from "../../../api/getApiClient"
import getApiBase from "../../../api/getApiBase"

export default function deleteArticle({
  contractId,
  articleId,
}: {
  contractId: number
  articleId: number
}) {
  return getApiClient()
    .delete<void>(`contracts/${contractId}/articles/${articleId}`)
    .then((response) => response.data)
}

export function deleteArticleMock() {
  return http.delete(
    getApiBase() + "/contracts/:contractId/articles/:articleId",
    () => {
      return HttpResponse.json({}, { status: 200 })
    }
  )
}
