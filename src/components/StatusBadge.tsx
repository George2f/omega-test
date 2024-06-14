import ITEM_STATUS_ENUM from "../model/types/ItemStatusEnum"
import { Badge } from "./ui/badge"

interface IStatusBadgeProps {
  status: ITEM_STATUS_ENUM
}

export default function StatusBadge({ status }: IStatusBadgeProps) {
  switch (status) {
    case ITEM_STATUS_ENUM.CREATED:
      return <Badge className="bg-green-600 hover:bg-green-600">{status}</Badge>
    case ITEM_STATUS_ENUM.ORDERED:
      return (
        <Badge className="bg-yellow-600 hover:bg-yellow-600">{status}</Badge>
      )
    case ITEM_STATUS_ENUM.DELIVERED:
      return <Badge className="bg-slate-600 hover:bg-slate-600">{status}</Badge>
    default:
      return null
  }
}
