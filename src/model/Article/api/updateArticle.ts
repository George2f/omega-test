import { HttpResponse, http } from "msw"
import getApiClient from "../../../api/getApiClient"
import IArticle from "../../types/IArticle"
import getApiBase from "../../../api/getApiBase"

export default function updateArticle({
  contractId,
  article,
}: {
  contractId: number
  article: IArticle
}) {
  return getApiClient()
    .put<IArticle>(`contracts/${contractId}/articles/${article.id}`, article)
    .then((response) => response.data)
}

export function updateArticleMock() {
  return http.put(
    getApiBase() + "/contracts/:contractId/articles/:articleId",
    () => {
      return HttpResponse.json({}, { status: 200 })
    }
  )
}
