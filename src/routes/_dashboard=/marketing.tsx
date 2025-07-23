
import { MetricsCardsVariant } from "@/components/metricas/MetricsCardsVariant"
import { BarChart3 } from "lucide-react"
import type { ValueFormat } from "@/components/metricas/MetricsCardsVariant"
import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function Metricas() {
  const fetchData = () => {
    const random = (Math.floor(Math.random() * 100.55))
    return (random - 40)/1000
  }

  const fetchDataValue = () => {
    const random = (Math.floor(Math.random() * 10000))
    return random
  }

  const values = [
    { value: fetchDataValue(), valueFormat: "decimal" as ValueFormat, percentageValue:fetchData(), title: "Tráfico Total", description: "Customer Lifetime Value", Icon: BarChart3, label: "Últimos 28 días" },
    { value: fetchDataValue(), valueFormat: "percent" as ValueFormat, percentageValue:fetchData(), title: "Bonus Rate ", description: "Ingreso Promedio por Usuario", Icon: BarChart3, label: "Últimos 28 días" },
    { value: fetchDataValue(), valueFormat: "decimal" as ValueFormat, percentageValue:fetchData(), title: "Jugadores Únicos", description: "Tasa de deserción", Icon: BarChart3, label: "Últimos 28 días" },
    { value: fetchDataValue(), valueFormat: "decimal" as ValueFormat, percentageValue:fetchData(), title: "Registros Totales", description: "Usuarios adquiridos", Icon: BarChart3, label: "Últimos 28 días" },
  ]

  return (
    <div className="w-full flex flex-col gap-6 rounded-lg text-black h-full py-1">
      <div className="grid w-full h-fit grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      <div className="w-full h-full max-h-full flex gap-6">
      <Tabs defaultValue="traffic" className="w-full h-full">
          <TabsList className="w-full">
            <TabsTrigger value="traffic">Tráfico</TabsTrigger>
            <TabsTrigger value="campaigns">Campañas</TabsTrigger>
            <TabsTrigger value="players">Jugadores</TabsTrigger>
          </TabsList>
          <TabsContents>

            <TabsContent className="w-full h-full" value="traffic">
              <div className="h-fit w-full grid grid-cols-1 md:grid-cols-2 gap-6">
             
              </div>
              
            </TabsContent>
            <TabsContent className="w-full h-full"  value="campaigns">
              <div className="h-fit w-full grid grid-cols-1 md:grid-cols-2 gap-6">
             
              </div>
            </TabsContent>
            <TabsContent className="w-full h-full"  value="players">
              <div className="h-fit w-full grid grid-cols-1 md:grid-cols-2 gap-6">
       
              </div>
            </TabsContent>
        </TabsContents>
      </Tabs>

      </div>
    </div>
  )
}
