import IArticle from "../model/types/IArticle"
import StatusBadge from "./StatusBadge"

interface IArticleCardProps {
  article: IArticle
}

export default function ArticleCard({ article }: IArticleCardProps) {
  return (
    <div className="pt-2 pb-2 mb-1 border-b-2 last:border-b-0">
      <div className="flex flex-row justify-between items-center">
        <p>Naziv: {article.naziv}</p>
        <StatusBadge status={article.status} />
      </div>
      <p>Dobavljač: {article.dobavljač}</p>
    </div>
  )
}
