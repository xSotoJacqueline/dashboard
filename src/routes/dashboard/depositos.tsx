import { createFileRoute } from '@tanstack/react-router'
import { UsersRoundIcon, UserRoundPlus, MedalIcon, GiftIcon } from "lucide-react"
import { GeneralCardTopCard, type ValueFormat } from "@/components/general-top-card"
import { EarningsClientBonosChart } from '@/components/bonos/earningsClientBonosChart'
import { FTDAmountChart } from '@/components/depositos/ftd-AmountChart'
import { FirstFTDChart } from '@/components/depositos/first-FTDChart'

export const Route = createFileRoute('/dashboard/depositos')({
  component: RouteComponent,
})

function RouteComponent() {
  
  const fetchData = () => {
    const random = (Math.floor(Math.random() * 100.55))
    return (random - 40)/1000
  }

  const fetchDataValue = () => {
    const random = (Math.floor(Math.random() * 100))
    return random
  }

  const values = [
    { value: fetchDataValue(), valueFormat: "currency" as ValueFormat, percentageValue:fetchData(), title: "Monto total de depósitos", Icon: MedalIcon, label: "Últimos 28 días" },
    { value: fetchDataValue(), valueFormat: "decimal" as ValueFormat, percentageValue:fetchData(), title: "Número de depósitos", Icon: GiftIcon, label: "Últimos 28 días" },
    { value: fetchDataValue(), valueFormat: "decimal" as ValueFormat, percentageValue:fetchData(), title: "FTD’s", Icon: UsersRoundIcon, label: "Últimos 28 días" },
    { value: fetchDataValue(), valueFormat: "currency" as ValueFormat, percentageValue:fetchData(), title: "Monto FTD’s", Icon: UserRoundPlus, label: "Últimos 28 días" },
  ]

  return (
    <div className={`w-full flex flex-col gap-6 rounded-lg text-black h-full py-1`}>
      <div className="grid w-full h-fit grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((metric, index) => (
          <GeneralCardTopCard
            key={index}
            value={metric.value}
            title={metric.title}
            Icon={metric.Icon}
            label={metric.label}
            percentageValue={metric.percentageValue}
            valueFormat={metric.valueFormat}
          />
        ))}
      </div>
            
      <div className="w-full h-full max-h-full flex gap-6">
        <EarningsClientBonosChart />
      </div>
      <div className="h-fit grid grid-cols-1 md:grid-cols-2 gap-6">
        <FirstFTDChart />
        <FTDAmountChart />
      </div>

    </div>
  )}
