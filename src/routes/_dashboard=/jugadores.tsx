import { Gamepad2, ChartLineIcon, Users } from "lucide-react"
import { GeneralCard, type ValueFormat, type GeneralCardProps } from "@/components/card-general"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/animated-tabs";
import TopUsersTab from "@/components/tabs/top-users-tab"
import SpecificGamesTab from "@/components/tabs/specific-games-tab";
import HybridUsersTab from "@/components/tabs/hybrid-users-tab";
import CategoriesTab from "@/components/tabs/categories-tab";

export default function Metricas() {
  const fetchData = () => {
    const random = (Math.floor(Math.random() * 100.55))
    return (random - 40)/1000
  }

  const fetchDataValue = () => {
    const random = (Math.floor(Math.random() * 10000))
    return random
  }

  const values: GeneralCardProps[] = [
    { value: fetchDataValue(), valueFormat: "decimal" as ValueFormat, percentageValue:fetchData(), title: "Total de Usuarios", Icon: Users, label: "Últimos 28 días" },
    { value: fetchDataValue(), valueFormat: "percent" as ValueFormat, percentageValue:fetchData(), title: "Usuarios híbridos", Icon: Users, label: "Últimos 28 días" },
    { value: fetchDataValue(), valueFormat: "decimal" as ValueFormat, percentageValue:fetchData(), title: "Ingresos Totales", Icon: ChartLineIcon, label: "Últimos 28 días" },
    { value: fetchDataValue(), valueFormat: "decimal" as ValueFormat, percentageValue:fetchData(), title: "Jugadores Activos", Icon: Gamepad2, label: "Últimos 28 días" },
  ]

  return (
    <div className="w-full flex flex-col gap-6 rounded-lg text-black h-full py-1">
      <div className="grid w-full h-fit grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((metric, index) => (
          <GeneralCard
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

       <Tabs defaultValue="top-users" className="w-full h-full">
          <ScrollArea className="whitespace-nowrap">
            <TabsList className="w-full">
                <TabsTrigger value="top-users">Top usuarios</TabsTrigger>
                <TabsTrigger value="categories">Categorías</TabsTrigger>
                <TabsTrigger value="specific-games">Juegos específicos</TabsTrigger>
                <TabsTrigger value="hybrid-players">Usuarios híbridos</TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

           <TabsContent  className="w-full h-full" value="top-users">
              <TopUsersTab />
           </TabsContent>
           <TabsContent className="w-full h-full" value="specific-games">
            <SpecificGamesTab />
          </TabsContent>
          <TabsContent className="w-full h-full" value="categories">
            <CategoriesTab />
          </TabsContent>
           <TabsContent className="w-full h-full" value="hybrid-players">
            <HybridUsersTab />
          </TabsContent>
        </Tabs>
    </div>
  )
}
