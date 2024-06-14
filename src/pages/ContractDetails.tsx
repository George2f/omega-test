import { useNavigate, useParams } from "react-router-dom"
import useGetContract from "../model/Contract/hooks/useGetContract"
import useGetArticles from "../model/Article/hooks/useGetArticles"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb"
import { Card, CardContent, CardHeader } from "../components/ui/card"
import ArticleCard from "../components/ArticleCard"

export default function ContractDetails() {
  const { contractId } = useParams()
  const navigate = useNavigate()
  const intContractId = parseInt(contractId as string)

  const {
    contract,
    isPending: isContractPending,
    error: isContractError,
  } = useGetContract({
    contractId: intContractId,
  })
  const { articles, isPending, error } = useGetArticles({
    contractId: intContractId,
  })

  return (
    <div>
      <Card>
        <CardHeader>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <span onClick={() => navigate("/")}>Ugovori</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{contractId}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <h1 className="text-3xl">Detalji ugovora</h1>
        </CardHeader>
        {isContractPending ? <p>Dohvaćam detalje ugovora</p> : null}
        {isContractError ? <p>Greška pri dohvaćanju ugovora</p> : null}
        {!isContractPending && !isContractError ? (
          <CardContent>
            <p>Kupac: {contract?.kupac}</p>
            <p>Broj ugovora: {contract?.broj_ugovora}</p>
            <p>
              Rok isporuke:{" "}
              {new Date(contract?.rok_isporuke || "").toLocaleDateString("hr")}
            </p>
            <p>
              Datum akontacije:{" "}
              {new Date(contract?.datum_akontacije || "").toLocaleDateString(
                "hr"
              )}
            </p>
          </CardContent>
        ) : null}
      </Card>
      <Card>
        <CardHeader>
          <h2 className="text-xl">Artikli</h2>
        </CardHeader>
        <CardContent>
          {isPending ? <p>Dohvaćam artikle</p> : null}
          {error ? <p>Greška pri dohvaćanju artikala</p> : null}
          {articles?.length
            ? articles?.map((a) => (
                <ArticleCard article={a} key={a.id}></ArticleCard>
              ))
            : "Nema artikala u ovom ugovoru"}
        </CardContent>
      </Card>
    </div>
  )
}
//TODO: ugraditi paginaciju
