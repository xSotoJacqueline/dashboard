import { totalFTDQueryOptions, totalTransactionsByTypeQueryOptions } from "@/queryOptions/queryOptions";
import { useSuspenseQueries } from "@tanstack/react-query";
import { GeneralCardTopCard, type ValueFormat } from "@/components/general-top-card"
import { UsersRoundIcon, UserRoundPlus, MedalIcon, GiftIcon } from "lucide-react"

export default function DespistosTopCards() {
  const [{data: firstTimeDepositAverage}, {data: totalTransactionsByType}] = useSuspenseQueries({
    queries: [totalFTDQueryOptions(), totalTransactionsByTypeQueryOptions()],
  });

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
    { value: firstTimeDepositAverage, valueFormat: "decimal" as ValueFormat, percentageValue:fetchData(), title: "FTD’s", Icon: UsersRoundIcon, label: "Últimos 28 días" },
    { value: totalTransactionsByType.Deposit, valueFormat: "currency" as ValueFormat, percentageValue:fetchData(), title: "Monto FTD’s", Icon: UserRoundPlus, label: "Últimos 28 días" },
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