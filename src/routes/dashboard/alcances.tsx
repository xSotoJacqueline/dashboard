import { createFileRoute } from '@tanstack/react-router'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/animated-tabs";
import CasinoBetsTab from '@/components/tabs/casino-bets-tab'
import PeakHoursTab from '@/components/tabs/peak-hours-tab';
import OverviewTab from '@/components/tabs/overview-tab';
import ErrorPage from '@/components/errorPage';
import type { GeneralSearch } from '@/types/search-types';

export const Route = createFileRoute('/dashboard/alcances')({
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
  pendingComponent: () => <div className="w-full h-full flex items-center justify-center">Loading sportsbook...</div>,
})

function RouteComponent() {

  //   const fetchData = () => {
  //   const random = (Math.floor(Math.random() * 100.55))
  //   return (random - 40)/1000
  // }

  // const fetchDataValue = () => {
  //   const random = (Math.floor(Math.random() * 100))
  //   return random
  // }

  // const values = [
  //   { value: fetchDataValue(), valueFormat: "decimal" as ValueFormat, percentageValue:fetchData(), title: "Usuarios por Publicidad", Icon: UsersRoundIcon, label: "Últimos 28 días" },
  //   { value: fetchDataValue(), valueFormat: "decimal" as ValueFormat, percentageValue:fetchData(), title: "Usuarios Orgánicos", Icon: TrendingUpIcon, label: "Últimos 28 días" },
  //   { value: fetchDataValue(), valueFormat: "currency" as ValueFormat, percentageValue:fetchData(), title: "Tiempo promedio total", Icon: ClockIcon, label: "Últimos 28 días" },
  //   { value: fetchDataValue(), valueFormat: "decimal" as ValueFormat, percentageValue:fetchData(), title: "Alcance de campañas ", Icon: EyeIcon, label: "Últimos 28 días" },
  // ]

  return (
    <div className="w-full flex flex-col gap-6 rounded-lg text-black h-full py-1">
      <div className="grid w-full h-fit grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* {values.map((metric, index) => (
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
        ))} */}
      </div>

       <Tabs defaultValue="overview" className="w-full h-full">
          <ScrollArea className="whitespace-nowrap">
            <TabsList className="w-full">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="traffic">Tráfico</TabsTrigger>
                <TabsTrigger value="campaigns">Campañas</TabsTrigger>
                <TabsTrigger value="real-time">Tiempo Real</TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

           <TabsContent  className="w-full h-full" value="overview">
              <OverviewTab />
            </TabsContent>
            <TabsContent className="w-full h-full" value="traffic">
              <CasinoBetsTab />
            </TabsContent>
            <TabsContent className="w-full h-full" value="campaigns">
              
            </TabsContent>
            <TabsContent className="w-full h-full" value="real-time">
              <PeakHoursTab />
            </TabsContent>
         
          
        </Tabs>
    </div>
  )}
