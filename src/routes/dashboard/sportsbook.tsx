import { createFileRoute } from '@tanstack/react-router'
import { UserRoundPlus, MedalIcon, GiftIcon, UsersRoundIcon } from "lucide-react"
import { GeneralCardTopCard, type ValueFormat } from "@/components/general-top-card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/animated-tabs";
import TransactionsTab from '@/components/tabs/transactions-tab'
import CasinoBetsTab from '@/components/tabs/casino-bets-tab'
import SoldTicketsTab from '@/components/tabs/sold-tickets-tab'
import PeakHoursTab from '@/components/tabs/peak-hours-tab';
import BetDistributionTab from '@/components/tabs/bet-distribution-tab';
import OnlinePlayersTab from '@/components/tabs/online-players-tab';

export const Route = createFileRoute('/dashboard/sportsbook')({
  component: RouteComponent,
  errorComponent: ({error}) => <div className="w-full h-full flex items-center justify-center">Error loading authenticated routes: {error.message}</div>,
  pendingComponent: () => <div className="w-full h-full flex items-center justify-center">Loading sportsbook...</div>,
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
    { value: fetchDataValue(), valueFormat: "decimal" as ValueFormat, percentageValue:fetchData(), title: "Total de Depósitos", Icon: MedalIcon, label: "Últimos 28 días" },
    { value: fetchDataValue(), valueFormat: "decimal" as ValueFormat, percentageValue:fetchData(), title: "Total de retiros", Icon: GiftIcon, label: "Últimos 28 días" },
    { value: fetchDataValue(), valueFormat: "currency" as ValueFormat, percentageValue:fetchData(), title: "Win (ganancia)", Icon: UsersRoundIcon, label: "Últimos 28 días" },
    { value: fetchDataValue(), valueFormat: "decimal" as ValueFormat, percentageValue:fetchData(), title: "Jugadores Activos", Icon: UserRoundPlus, label: "Últimos 28 días" },
  ]

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

       <Tabs defaultValue="transactions" className="w-full h-full">
          <ScrollArea className="whitespace-nowrap">
            <TabsList className="w-full">
                <TabsTrigger value="transactions">Transacciones</TabsTrigger>
                <TabsTrigger value="casino-bets">Apuestas por casino</TabsTrigger>
                <TabsTrigger value="sold-tickets">Tickets vendidos</TabsTrigger>
                <TabsTrigger value="peak-hours">Horarios pico</TabsTrigger>
                <TabsTrigger value="bet-distribution">Distribución de apuestas</TabsTrigger>
                <TabsTrigger value="online-players">Jugadores online</TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

           <TabsContent  className="w-full h-full" value="transactions">
              <TransactionsTab />
            </TabsContent>
            <TabsContent className="w-full h-full" value="casino-bets">
              <CasinoBetsTab />
            </TabsContent>
            <TabsContent className="w-full h-full" value="sold-tickets">
              <SoldTicketsTab />
            </TabsContent>
            <TabsContent className="w-full h-full" value="peak-hours">
              <PeakHoursTab />
            </TabsContent>
            <TabsContent className="w-full h-full" value="bet-distribution">
              <BetDistributionTab />
            </TabsContent>
            <TabsContent className="w-full h-full" value="online-players">
              <OnlinePlayersTab />
            </TabsContent>
          
        </Tabs>
    </div>
  )}
