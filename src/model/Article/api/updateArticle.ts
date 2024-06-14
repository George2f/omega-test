import { HttpResponse, delay, http } from "msw"
import getApiClient from "../../../api/getApiClient"
import IArticle from "../../types/IArticle"
import getApiBase from "../../../api/getApiBase"
import IContract from "../../types/IContract"

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

export function updateArticleMock(mockStore: {
  contracts: IContract[]
  articles: {
    [contractId: string]: IArticle[]
  }
}) {
  return http.put(
    getApiBase() + "/contracts/:contractId/articles/:articleId",
    async ({ params, request }) => {
      const contractId = parseInt(params.contractId as string, 10)
      const articleId = parseInt(params.articleId as string, 10)

      const article = (await request.json()) as IArticle

      const articleIndex = mockStore.articles[contractId].findIndex(
        (article) => article.id === articleId
      )

      await delay(300)

      if (articleIndex === -1) {
        return HttpResponse.json({}, { status: 404 })
      }

      mockStore.articles[contractId][articleIndex] = article

      return HttpResponse.json(article, { status: 200 })
    }
  )
}
