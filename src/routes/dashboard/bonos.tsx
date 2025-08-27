import { createFileRoute } from '@tanstack/react-router'
import { UsersRoundIcon, UserRoundPlus, MedalIcon, GiftIcon } from "lucide-react"
import { GeneralCardTopCard, type ValueFormat } from "@/components/general-top-card"
import { RankingBonosTable } from '@/components/bonos/ranking-table'
import { BonosPerClientChart } from '@/components/bonos/bonosPerClientChart'
import { EarningsClientBonosChart } from '@/components/bonos/earningsClientBonosChart'
import ErrorPage from '@/components/errorPage'
import type { GeneralSearch } from '@/types/search-types'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/dashboard/bonos')({
  validateSearch: (search: Record<string, unknown>): GeneralSearch => {
    return {
      from: typeof search?.from === 'number'
        ? search.from
        : undefined,
      to: typeof search?.to === 'number'
        ? search.to
        : undefined,
    }
  },
  component: RouteComponent,
  errorComponent: ({error}) => <ErrorPage error={error.message} />,
  
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
    { value: fetchDataValue(), valueFormat: "decimal" as ValueFormat, percentageValue:fetchData(), title: "Total Redenciones", Icon: MedalIcon, label: "Últimos 28 días" },
    { value: fetchDataValue(), valueFormat: "currency" as ValueFormat, percentageValue:fetchData(), title: "Monto Regalado", Icon: GiftIcon, label: "Últimos 28 días" },
    { value: fetchDataValue(), valueFormat: "currency" as ValueFormat, percentageValue:fetchData(), title: "Convertido a dinero", Icon: UsersRoundIcon, label: "Últimos 28 días" },
    { value: fetchDataValue(), valueFormat: "percent" as ValueFormat, percentageValue:fetchData(), title: "Tasa de conversión", Icon: UserRoundPlus, label: "Últimos 28 días" },
  ]

  return (
    <div className={`w-full flex flex-col gap-6 rounded-lg text-black h-full py-1`}>

      <section className='w-full h-fit'>
        <div className="grid w-full h-fit grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((metric, index) => (
            <GeneralCardTopCard
              key={index}
              value={metric.value}
              title={metric.title}
              Icon={metric.Icon}
              label={metric.label}
              index={index+1}
              percentageValue={metric.percentageValue}
              valueFormat={metric.valueFormat}
            />
          ))}
        </div>
        <motion.div layoutId="tabs-list" className='w-full' />
      </section>
      <div className="h-fit grid grid-cols-1 md:grid-cols-2 gap-6">
        <RankingBonosTable />
        <BonosPerClientChart />
      </div>
      
      <div className="w-full h-full max-h-full flex gap-6">
        <EarningsClientBonosChart />
      </div>
    </div>
  )}
