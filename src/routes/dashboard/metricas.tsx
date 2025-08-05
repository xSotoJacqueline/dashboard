import { createFileRoute } from '@tanstack/react-router'
import { BarChart3 } from "lucide-react"
import { ChartLineLabel } from "@/components/metricas/lineChart"
import { GeneralCardTopCard, type ValueFormat } from "@/components/general-top-card"
import ErrorPage from '@/components/errorPage'
import type { GeneralSearch } from '@/types/search-types'

export const Route = createFileRoute('/dashboard/metricas')({
  validateSearch: (search: Record<string, unknown>): GeneralSearch => {
    return {
      from: typeof search?.from === 'number'
        ? search.from
        : undefined,
      to: typeof search?.to === 'number'
        ? search.to
        : undefined,
      apply: typeof search?.apply === 'boolean'
        ? search.apply
        : false,
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
    { value: fetchDataValue(), valueFormat: "decimal" as ValueFormat, percentageValue:fetchData(), title: "CTVL", description: "Customer Lifetime Value", Icon: BarChart3, label: "Últimos 28 días" },
    { value: fetchDataValue(), valueFormat: "currency" as ValueFormat, percentageValue:fetchData(), title: "ARPU", description: "Ingreso Promedio por Usuario", Icon: BarChart3, label: "Últimos 28 días" },
    { value: fetchDataValue(), valueFormat: "percent" as ValueFormat, percentageValue:fetchData(), title: "Deserción", description: "Tasa de deserción", Icon: BarChart3, label: "Últimos 28 días" },
    { value: fetchDataValue(), valueFormat: "decimal" as ValueFormat, percentageValue:fetchData(), title: "Adquisición", description: "Usuarios adquiridos", Icon: BarChart3, label: "Últimos 28 días" },
    { value: fetchDataValue(), valueFormat: "percent" as ValueFormat, percentageValue:fetchData(), title: "Retención", description: "Tasa de retención", Icon: BarChart3, label: "Últimos 28 días" },
  ]

  return (
    <div className={`w-full flex flex-col gap-6 rounded-lg text-black h-full py-1`}>
      <div className="grid w-full h-fit grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {values.map((metric, index) => (
          <GeneralCardTopCard
            key={index}
            value={metric.value}
            title={metric.title}
            description={metric.description}
            Icon={metric.Icon}
            label={metric.label}
            percentageValue={metric.percentageValue}
            valueFormat={metric.valueFormat}
          />
        ))}
      </div>
      <div className="h-fit grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartLineLabel identifier='chart1'  title="Tasa de Adquisición" />
        <ChartLineLabel identifier='chart2'  title="Tasa de Deserción" />
      </div>
      
      <div className="w-full h-full max-h-full flex gap-6">
        <ChartLineLabel identifier='chart3'  title="Customer Lifetime Value" />
      </div>
    </div>
  )}
