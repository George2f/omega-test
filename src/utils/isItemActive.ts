import IItem from "../model/types/IItem"
import ITEM_STATUS_ENUM from "../model/types/ItemStatusEnum"

export default function isItemActive(item: IItem) {
  return item.status !== ITEM_STATUS_ENUM.DELIVERED
}
