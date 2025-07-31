import { createFileRoute } from '@tanstack/react-router'
import { BarChart3, Circle, ChartLine, UserRoundPlus, Users } from "lucide-react"

import TrafficTab from "@/components/tabs/traffic-tab"
import type { TrafficSource } from "@/components/tabs/traffic-sources"
import CampaignTab, { type CampaignPerformanceProps } from "@/components/marketing/campaign-tab"
import { GeneralCardTopCard, type ValueFormat, type GeneralCardTopCardProps } from "@/components/general-top-card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/animated-tabs";
import PlayersTab from "@/components/tabs/players-tab"
import ErrorPage from '@/components/errorPage'

export const Route = createFileRoute('/dashboard/marketing')({
  component: RouteComponent,
  errorComponent: ({error}) => <ErrorPage error={error.message} />,
  
})

function RouteComponent() {
 const fetchData = () => {
    const random = (Math.floor(Math.random() * 100.55))
    return (random - 40)/1000
  }

  const fetchDataValue = () => {
    const random = (Math.floor(Math.random() * 10000))
    return random
  }

  const fetchRandomVisits = () => {
    return Math.floor(Math.random() * 1500) + 100;
  }

  const fetchRandomPercentage = () => {
    const random = (Math.floor(Math.random() * 100.55))
    return (random - 40)/1000
  }

  const values: GeneralCardTopCardProps[] = [
    { value: fetchDataValue(), valueFormat: "decimal" as ValueFormat, percentageValue:fetchData(), title: "Tráfico Total", Icon: ChartLine, label: "Últimos 28 días" },
    { value: fetchDataValue(), valueFormat: "percent" as ValueFormat, percentageValue:fetchData(), title: "Bonus Rate ", Icon: BarChart3, label: "Últimos 28 días" },
    { value: fetchDataValue(), valueFormat: "decimal" as ValueFormat, percentageValue:fetchData(), title: "Jugadores Únicos", Icon: Users, label: "Últimos 28 días" },
    { value: fetchDataValue(), valueFormat: "decimal" as ValueFormat, percentageValue:fetchData(), title: "Registros Totales", Icon: UserRoundPlus, label: "Últimos 28 días" },
  ]

  const campaignValues: GeneralCardTopCardProps[] = [
    { value: fetchData(), valueFormat: "percent" as ValueFormat, percentageValue:fetchData(), title: "CTR Promedio", Icon: Circle, label: "Últimos 28 días" },
    { value: fetchDataValue(), valueFormat: "percent" as ValueFormat, percentageValue:fetchData(), title: "Alcance Total", Icon: ChartLine, label: "Últimos 28 días" },
    { value: fetchDataValue(), valueFormat: "decimal" as ValueFormat, percentageValue:fetchData(), title: "Conversiones", Icon: UserRoundPlus, label: "Últimos 28 días" },
  ]

  const campaignPerformanceValues: CampaignPerformanceProps[] = [
    { title: "CTR Promedio", status: "active", alcance: fetchData(), ctr: fetchData(), conversiones: fetchData() },
    { title: "Alcance Total", status: "active", alcance: fetchDataValue(), ctr: fetchData(), conversiones: fetchData() },
    { title: "Conversiones", status: "inactive", alcance: fetchDataValue(), ctr: fetchData(), conversiones: fetchData() },
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

       <Tabs defaultValue="traffic" className="w-full h-full">
          <ScrollArea className="whitespace-nowrap">
            <TabsList className="w-full">
                <TabsTrigger value="traffic">Tráfico</TabsTrigger>
                <TabsTrigger value="campaigns">Campañas</TabsTrigger>
                <TabsTrigger value="players">Jugadores</TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

           <TabsContent  className="w-full h-full" value="traffic">
              <TrafficTab trafficSources={trafficSources} />
            </TabsContent>
            <TabsContent className="w-full h-full" value="campaigns">
              <CampaignTab campaignPerformanceValues={campaignPerformanceValues} campaignValues={campaignValues} />
            </TabsContent>
            <TabsContent className="w-full h-full" value="players">
              <PlayersTab />
            </TabsContent>
          
        </Tabs>
    </div>
  )}
