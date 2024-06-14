import IItem from "./IItem"

export default interface IContract extends IItem {
  kupac: string
  broj_ugovora: string
  datum_akontacije: string
  rok_isporuke: string
}
