import { HttpResponse, delay, http } from "msw"
import getApiClient from "../../../api/getApiClient"
import getApiBase from "../../../api/getApiBase"
import IArticle from "../../types/IArticle"
import IContract from "../../types/IContract"

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

export function getArticleMock(mockStore: {
  contracts: IContract[]
  articles: {
    [contractId: string]: IArticle[]
  }
}) {
  return http.get(
    getApiBase() + "/contracts/:contractId/articles/:articleId",
    async ({ params }) => {
      const contractId = parseInt(params.contractId as string)
      const articleId = parseInt(params.articleId as string)
      const articles = mockStore.articles[contractId]

      await delay(300)

      if (!articles) {
        return HttpResponse.json({}, { status: 404 })
      }

      const article = articles.find((article) => article.id === articleId)

      if (!article) {
        return HttpResponse.json({}, { status: 404 })
      }

      return HttpResponse.json(article, { status: 200 })
    }
  )
}
