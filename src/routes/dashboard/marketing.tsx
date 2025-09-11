import { createFileRoute } from '@tanstack/react-router'
import TrafficTab from "@/components/tabs/traffic-tab"
import CampaignTab from "@/components/marketing/campaign-tab"
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

  return (
    <div className="w-full flex flex-col gap-6 rounded-lg text-black h-full py-1">
      <MarketingTopCards />

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
              <TrafficTab />
            </TabsContent>
            <TabsContent className="w-full h-full" value="campaigns">
              <CampaignTab />
            </TabsContent>
            <TabsContent className="w-full h-full" value="players">
              <PlayersTab />
            </TabsContent>
        </Tabs>
    </div>
  )}
