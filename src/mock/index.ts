import { setupWorker } from "msw/browser"
import { getArticleMock } from "../model/Article/api/getArticle"
import { createArticleMock } from "../model/Article/api/createArticle"
import { deleteArticleMock } from "../model/Article/api/deleteArticle"
import { updateArticleMock } from "../model/Article/api/updateArticle"
import { createContractMock } from "../model/Contract/api/createContract"
import { deleteContractMock } from "../model/Contract/api/deleteContract"
import { getContractMock } from "../model/Contract/api/getContract"
import { updateContractMock } from "../model/Contract/api/updateContract"
import { getArticlesMock } from "../model/Article/api/getArticles"
import { getContractsMock } from "../model/Contract/api/getContracts"
import IContract from "../model/types/IContract"
import IArticle from "../model/types/IArticle"
import storeSeed from "./storeSeed.json"

let mockStore = {
  contracts: [] as IContract[],
  articles: {} as {
    [contractId: string]: IArticle[]
  },
}

mockStore = storeSeed as typeof mockStore

export const worker = setupWorker(
  ...[
    createArticleMock(mockStore),
    deleteArticleMock(mockStore),
    getArticleMock(mockStore),
    getArticlesMock(mockStore),
    updateArticleMock(mockStore),
    createContractMock(mockStore),
    deleteContractMock(mockStore),
    getContractMock(mockStore),
    getContractsMock(mockStore),
    updateContractMock(mockStore),
  ]
)
