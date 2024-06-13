import { HttpResponse, http } from "msw"
import getApiClient from "../../../api/getApiClient"
import getApiBase from "../../../api/getApiBase"
import IArticle from "../../types/IArticle"

export default function getArticles({ contractId }: { contractId: number }) {
  return getApiClient()
    .get<IArticle[]>(`contracts/${contractId}/articles`)
    .then((response) => response.data)
}

export function getArticlesMock() {
  return http.get(getApiBase() + "/contracts/:contractId/articles", () => {
    return HttpResponse.json({}, { status: 200 })
  })
}
