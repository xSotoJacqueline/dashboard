
import { MetricsCardsVariant } from "@/components/metricas/MetricsCardsVariant"
import { BarChart3 } from "lucide-react"
import type { ValueFormat } from "@/components/metricas/MetricsCardsVariant"
import { ChartLineLabel } from "@/components/metricas/lineChart"
import { ChartLineLabelBottom } from "@/components/metricas/lineChart-bottom"

export default function Metricas() {
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
    <div className="w-full flex flex-col gap-6 rounded-lg text-black h-full py-1">
      <div className="grid w-full h-fit grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {values.map((metric, index) => (
          <MetricsCardsVariant
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
        <ChartLineLabel title="Tasa de Adquisición" />
        <ChartLineLabel title="Tasa de Desereción" />
      </div>
      
      <div className="w-full h-full max-h-full flex gap-6">
        <ChartLineLabelBottom title="Customer Lifetime Value" />
      </div>
    </div>
  )
}
