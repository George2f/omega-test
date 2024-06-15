import { useMemo, useState } from "react"
import useGetContracts from "../model/Contract/hooks/useGetContracts"
import { useNavigate } from "react-router-dom"
import Fuse from "fuse.js"
import { Input } from "../components/ui/input"
import { Checkbox } from "../components/ui/checkbox"
import { Card, CardContent, CardHeader } from "../components/ui/card"
import { Label } from "../components/ui/label"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "../components/ui/breadcrumb"
import ContractCard from "../components/ContractCard"
import { Dialog, DialogTrigger } from "../components/ui/dialog"
import NewContractModal from "../components/NewContractModal"
import useUpdateContract from "../model/Contract/hooks/useUpdateContract"
import { Button } from "../components/ui/button"
import useCreateContract from "../model/Contract/hooks/useCreateContract"
import isItemActive from "../utils/isItemActive"

export default function Home() {
  const { contracts, isPending, error } = useGetContracts()
  const { updateContract } = useUpdateContract()
  const { createContract } = useCreateContract()
  const navigate = useNavigate()
  const [showOnlyActive, setShowOnlyActive] = useState(false)
  const [kupacFilterValue, setKupacFilterValue] = useState("")
  const [isNewContractModalOpen, setIsNewContractModalOpen] = useState(false)

  const filteredContracts = useMemo(() => {
    const fuse = new Fuse(contracts || [], {
      keys: ["kupac"],
      threshold: 0.3,
    })
    const filtered = kupacFilterValue
      ? fuse.search(kupacFilterValue).map((r) => r.item)
      : contracts

    return filtered?.filter((c) => {
      if (showOnlyActive) {
        return isItemActive(c)
      }
      return true
    })
  }, [contracts, kupacFilterValue, showOnlyActive])

  // TODO: dodati skeleton loading state
  // TODO: extractati zajedničke elemente headera u odvojenu komponentu i staviti ga u neki zajednički parent
  return (
    <div>
      <Card>
        <CardHeader>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Ugovori</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </CardHeader>
        <CardContent>
          <h2>Filteri</h2>
          <Input
            value={kupacFilterValue}
            placeholder="Ime kupca"
            onChange={(e) => setKupacFilterValue(e.target.value)}
          />
          <Checkbox
            id="active-checkbox"
            checked={showOnlyActive}
            onClick={() => setShowOnlyActive((v) => !v)}
          />
          <Label htmlFor="active-checkbox">Prikaži samo aktivne</Label>
        </CardContent>
      </Card>
      <Dialog
        open={isNewContractModalOpen}
        onOpenChange={(v) => setIsNewContractModalOpen(v)}>
        <DialogTrigger>
          <Button>Novi ugovor</Button>
        </DialogTrigger>
        <NewContractModal
          onSubmit={(contract) => {
            createContract({ contract }).then(() => {
              setIsNewContractModalOpen(false)
            })
          }}
        />
      </Dialog>
      {isPending ? <p>Dohvaćam ugovore...</p> : null}
      {error ? <p>Greška pri dohvačanju ugovora</p> : null}
      {filteredContracts?.map((c) => (
        <ContractCard
          contract={c}
          key={c.id}
          onChange={(contract) => updateContract({ contract })}
          onDetailsClick={() => navigate(`/contracts/${c.id}`)}
        />
      ))}
    </div>
  )
}
//TODO: dodati paginaciju na stranicu
//TODO: dodati loadere nakon svake akcije
