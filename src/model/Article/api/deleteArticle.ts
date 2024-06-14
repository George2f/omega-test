import { HttpResponse, delay, http } from "msw"
import getApiClient from "../../../api/getApiClient"
import getApiBase from "../../../api/getApiBase"
import IContract from "../../types/IContract"
import IArticle from "../../types/IArticle"

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

export function deleteArticleMock(mockStore: {
  contracts: IContract[]
  articles: {
    [contractId: string]: IArticle[]
  }
}) {
  return http.delete(
    getApiBase() + "/contracts/:contractId/articles/:articleId",
    async ({ params }) => {
      const contractId = parseInt(params.contractId as string, 10)
      const articleId = parseInt(params.articleId as string, 10)

      const articleIndex = mockStore.articles[contractId].findIndex(
        (article) => article.id === articleId
      )

      await delay(300)

      if (articleIndex === -1) {
        return HttpResponse.json({}, { status: 404 })
      }

      mockStore.articles[contractId].splice(articleIndex, 1)

      return HttpResponse.json({}, { status: 200 })
    }
  )
}
