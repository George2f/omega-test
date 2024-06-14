import { useState } from "react"
import IContract from "../model/types/IContract"
import ITEM_STATUS_ENUM from "../model/types/ItemStatusEnum"
import isItemActive from "../utils/isItemActive"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Input } from "./ui/input"
import StatusBadge from "./StatusBadge"

interface IContractCardProps {
  contract: IContract
  onDetailsClick: () => void
  onChange: (contract: IContract) => void
}

export default function ContractCard({
  contract,
  onDetailsClick,
  onChange,
}: IContractCardProps) {
  const [isEditingDelivery, setIsEditingDelivery] = useState(false)
  const [deliveryEditValue, setDeliveryEditValue] = useState(
    contract.rok_isporuke
  )
  return (
    <Card className="mb-1">
      <CardHeader className="flex flex-row justify-between">
        Broj: {contract.broj_ugovora}
        <div className="flex flex-row">
          <StatusBadge status={contract.status} />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col lg:flex-row justify-between gap-1">
        <div>
          <h2>Kupac: {contract.kupac}</h2>
          <p className="flex flex-row items-center">
            Rok isporuke:{" "}
            {isEditingDelivery ? (
              <>
                <Input
                  value={deliveryEditValue}
                  type="date"
                  onChange={(e) => setDeliveryEditValue(e.target.value)}
                />
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => {
                    onChange({
                      ...contract,
                      rok_isporuke: deliveryEditValue,
                    })
                    setIsEditingDelivery(false)
                  }}>
                  Spremi
                </Button>
              </>
            ) : (
              <>
                {new Date(contract.rok_isporuke).toLocaleDateString("hr")}
                {isItemActive(contract) ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditingDelivery(true)}>
                    Uredi
                  </Button>
                ) : null}
              </>
            )}
          </p>
        </div>
        <div className="flex flex-row">
          {isItemActive(contract) ? (
            <Button
              variant="outline"
              onClick={() => {
                onChange({
                  ...contract,
                  status:
                    contract.status === ITEM_STATUS_ENUM.CREATED
                      ? ITEM_STATUS_ENUM.ORDERED
                      : ITEM_STATUS_ENUM.DELIVERED,
                })
              }}>
              Prebaci status
            </Button>
          ) : null}
          <Button variant="secondary" onClick={onDetailsClick}>
            Detalji
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
