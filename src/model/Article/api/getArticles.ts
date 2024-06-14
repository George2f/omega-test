import { HttpResponse, delay, http } from "msw"
import getApiClient from "../../../api/getApiClient"
import getApiBase from "../../../api/getApiBase"
import IArticle from "../../types/IArticle"
import IContract from "../../types/IContract"

export default function getArticles({ contractId }: { contractId: number }) {
  return getApiClient()
    .get<IArticle[]>(`contracts/${contractId}/articles`)
    .then((response) => response.data)
}

export function getArticlesMock(mockStore: {
  contracts: IContract[]
  articles: {
    [contractId: string]: IArticle[]
  }
}) {
  return http.get(
    getApiBase() + "/contracts/:contractId/articles",
    async ({ params }) => {
      const contractId = parseInt(params.contractId as string)
      const articles = mockStore.articles[contractId]

      await delay(300)

      if (!articles) {
        return HttpResponse.json({}, { status: 404 })
      }

      return HttpResponse.json(articles, { status: 200 })
    }
  )
}
