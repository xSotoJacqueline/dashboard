
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
import TrafficTab from "@/components/marketing/traffic-tab"
import type { TrafficSource } from "@/components/marketing/traffic-sources"

export default function Metricas() {
  const fetchData = () => {
    const random = (Math.floor(Math.random() * 100.55))
    return (random - 40)/1000
  }

  const fetchDataValue = () => {
    const random = (Math.floor(Math.random() * 10000))
    return random
  }

  const fetchRandomVisits = () => {
    return Math.floor(Math.random() * 1500) + 100; // Entre 100 y 1600 visitas
  }

  const fetchRandomPercentage = () => {
    const random = (Math.floor(Math.random() * 100.55))
    return (random - 40)/1000
  }

  const values = [
    { value: fetchDataValue(), valueFormat: "decimal" as ValueFormat, percentageValue:fetchData(), title: "Tráfico Total", Icon: BarChart3, label: "Últimos 28 días" },
    { value: fetchDataValue(), valueFormat: "percent" as ValueFormat, percentageValue:fetchData(), title: "Bonus Rate ", Icon: BarChart3, label: "Últimos 28 días" },
    { value: fetchDataValue(), valueFormat: "decimal" as ValueFormat, percentageValue:fetchData(), title: "Jugadores Únicos", Icon: BarChart3, label: "Últimos 28 días" },
    { value: fetchDataValue(), valueFormat: "decimal" as ValueFormat, percentageValue:fetchData(), title: "Registros Totales", Icon: BarChart3, label: "Últimos 28 días" },
  ]



  const trafficSources: TrafficSource[] = [
    { source: "Directo", totalVisits: fetchRandomVisits(), referenceVisits: fetchRandomPercentage() },
    { source: "Orgánico", totalVisits: fetchRandomVisits(), referenceVisits: fetchRandomPercentage() },
    { source: "Referido", totalVisits: fetchRandomVisits(), referenceVisits: fetchRandomPercentage() },
    { source: "Social", totalVisits: fetchRandomVisits(), referenceVisits: fetchRandomPercentage() },
    { source: "Email", totalVisits: fetchRandomVisits(), referenceVisits: fetchRandomPercentage() },
  ];

  return (
    <div className="w-full flex flex-col gap-6 rounded-lg text-black h-full py-1">
      <div className="grid w-full h-fit grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((metric, index) => (
          <MetricsCardsVariant
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
      <Tabs defaultValue="traffic" className="w-full h-full">
          <TabsList className="w-full">
            <TabsTrigger value="traffic">Tráfico</TabsTrigger>
            <TabsTrigger value="campaigns">Campañas</TabsTrigger>
            <TabsTrigger value="players">Jugadores</TabsTrigger>
          </TabsList>
          <TabsContents className="w-full h-full pt-4">
            <TabsContent className="w-full !h-full" value="traffic">
              <TrafficTab trafficSources={trafficSources} />
            </TabsContent>
            <TabsContent className="w-full h-full" value="campaigns">
              <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            
              </div>
            </TabsContent>
            <TabsContent className="w-full h-full" value="players">
              <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 gap-6">

              </div>
            </TabsContent>
          </TabsContents>
      </Tabs>
    </div>
  )
}
