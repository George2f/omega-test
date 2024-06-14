import IItem from "./IItem"

export default interface IArticle extends IItem {
  naziv: string
  dobavljač: string
}
