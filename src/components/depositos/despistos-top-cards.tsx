import { type totalTransactionsByType } from "@/queryOptions/queryOptions";
import { GeneralCardTopCard, type ValueFormat } from "@/components/general-top-card"
import { UsersRoundIcon, UserRoundPlus, MedalIcon, GiftIcon } from "lucide-react"

export default function DespistosTopCards({firstTimeDepositAverage, totalTransactionsByType, totalAmountFTD, depositsQuantity}: {firstTimeDepositAverage: number, totalTransactionsByType: totalTransactionsByType, totalAmountFTD: number, depositsQuantity: number}) {


  const fetchData = () => {
    const random = (Math.floor(Math.random() * 100.55))
    return (random - 40)/1000
  }
  
  const values = [
    { value: totalTransactionsByType.Deposit, valueFormat: "currency" as ValueFormat, percentageValue:fetchData(), title: "Monto total de depósitos", Icon: MedalIcon, label: "Últimos 28 días" },
    { value: depositsQuantity, valueFormat: "decimal" as ValueFormat, percentageValue:fetchData(), title: "Número de depósitos", Icon: GiftIcon, label: "Últimos 28 días" },
    { value: firstTimeDepositAverage, valueFormat: "decimal" as ValueFormat, percentageValue:fetchData(), title: "FTD’s", Icon: UsersRoundIcon, label: "Últimos 28 días" },
    { value: totalAmountFTD, valueFormat: "currency" as ValueFormat, percentageValue:fetchData(), title: "Monto FTD’s", Icon: UserRoundPlus, label: "Últimos 28 días" },
  ]
  return (
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
  );
}