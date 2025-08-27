import { createFileRoute, useSearch } from '@tanstack/react-router'
import { Circle, ChartLine, UserRoundPlus } from "lucide-react"

import TrafficTab from "@/components/tabs/traffic-tab"
import type { TrafficSource } from "@/components/tabs/traffic-sources"
import CampaignTab, { type CampaignPerformanceProps } from "@/components/marketing/campaign-tab"
import { type ValueFormat, type GeneralCardTopCardProps } from "@/components/general-top-card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/animated-tabs";
import PlayersTab from "@/components/tabs/players-tab"
import ErrorPage from '@/components/errorPage'
import type { GeneralSearch } from '@/types/search-types'
import MarketingTopCards from '@/components/marketing/marketing-top-cards'
import { createQueryString } from '@/lib/utils'

export const Route = createFileRoute('/dashboard/marketing')({
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

  const search = useSearch({ from: '/dashboard/marketing' });
  const { queryString, labelTimePeriod } = createQueryString({ fromPeriod: search.from, toPeriod: search.to });

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
      <MarketingTopCards queryString={queryString} labelTimePeriod={labelTimePeriod} />

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
              <PlayersTab queryString={queryString} labelTimePeriod={labelTimePeriod}/>
            </TabsContent>
          
        </Tabs>
    </div>
  )}
