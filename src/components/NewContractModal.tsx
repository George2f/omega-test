import { useState } from "react"
import IContract from "../model/types/IContract"
import { Button } from "./ui/button"
import { DialogContent, DialogFooter, DialogHeader } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

interface INewContractModalProps {
  onSubmit: (contract: Partial<IContract>) => void
}

export default function NewContractModal({ onSubmit }: INewContractModalProps) {
  const [contractValue, setContractValue] = useState<Partial<IContract>>({})

  //TODO: instalirati yup i napraviti validaciju

  const isFormValid =
    contractValue.broj_ugovora &&
    contractValue.kupac &&
    contractValue.rok_isporuke &&
    contractValue.datum_akontacije

  return (
    <DialogContent>
      <DialogHeader>Novi ugovor</DialogHeader>
      <Label htmlFor="broj_ugovora">
        Broj ugovora <span className="text-red-600">*</span>
      </Label>
      <Input
        id="broj_ugovora"
        placeholder="Broj ugovora"
        required
        value={contractValue.broj_ugovora}
        onChange={(e) => {
          setContractValue((cv) => ({ ...cv, broj_ugovora: e.target.value }))
        }}
      />
      <Label htmlFor="kupac">
        Kupac <span className="text-red-600">*</span>
      </Label>
      <Input
        id="kupac"
        placeholder="Kupac"
        required
        value={contractValue.kupac}
        onChange={(e) => {
          setContractValue((cv) => ({
            ...cv,
            kupac: e.target.value,
          }))
        }}
      />
      <Label htmlFor="rok_isporuke">
        Rok isporuke <span className="text-red-600">*</span>
      </Label>
      <Input
        id="rok_isporuke"
        placeholder="Rok isporuke"
        required
        type="date"
        value={contractValue.rok_isporuke}
        onChange={(e) => {
          setContractValue((cv) => ({
            ...cv,
            rok_isporuke: e.target.value,
          }))
        }}
      />
      <Label htmlFor="datum_akontacije">
        Datum akontacije <span className="text-red-600">*</span>
      </Label>
      <Input
        id="datum_akontacije"
        placeholder="Datum akontacije"
        required
        type="date"
        value={contractValue.datum_akontacije}
        onChange={(e) => {
          setContractValue((cv) => ({
            ...cv,
            datum_akontacije: e.target.value,
          }))
        }}
      />
      <DialogFooter>
        <Button
          type="submit"
          disabled={!isFormValid}
          onClick={() => {
            onSubmit(contractValue)
            setContractValue({})
          }}>
          Spremi
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
