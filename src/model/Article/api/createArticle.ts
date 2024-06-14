import { HttpResponse, delay, http } from "msw"
import getApiClient from "../../../api/getApiClient"
import IArticle from "../../types/IArticle"
import getApiBase from "../../../api/getApiBase"
import IContract from "../../types/IContract"

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

export function createArticleMock(mockStore: {
  contracts: IContract[]
  articles: {
    [contractId: string]: IArticle[]
  }
}) {
  return http.post(
    getApiBase() + "/contracts/:contractId/articles",
    async ({ request, params }) => {
      const contractId = parseInt(params.contractId as string, 10)
      const article = (await request.json()) as IArticle

      const biggestArticleId = Object.values(mockStore.articles).reduce(
        (acc, articles) =>
          articles.reduce(
            (acc, article) => (article.id > acc ? article.id : acc),
            acc
          ),
        0
      )

      article.id = biggestArticleId + 1

      if (!mockStore.articles[contractId]) {
        mockStore.articles[contractId] = []
      }

      mockStore.articles[contractId].push(article)

      await delay(300)
      return HttpResponse.json({}, { status: 200 })
    }
  )
}
