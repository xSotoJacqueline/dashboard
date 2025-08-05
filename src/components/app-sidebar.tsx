import * as React from "react"

import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { NavCalendar } from "./nav-calendar"
import {
  CreditCardIcon,
  ChartLineIcon,
  SpeechIcon,
  ChartNoAxesCombinedIcon,
  UserIcon,
  GiftIcon,
  HandCoinsIcon,
  BookIcon,
} from "lucide-react"

const data = {
  projects: [
    {
      name: "Retiros",
      url: "/dashboard/retiros",
      icon: CreditCardIcon,
    },
    {
      name: "Métricas",
      url: "/dashboard/metricas",
      icon: ChartLineIcon,
    },
    {
      name: "Marketing",
      url: "/dashboard/marketing",
      icon: SpeechIcon,
    },
    {
      name: "Jugadores",
      url: "/dashboard/jugadores",
      icon: UserIcon,
    },
    {
      name: "Bonos",
      url: "/dashboard/bonos",
      icon: GiftIcon,
    },
    {
      name: "Depósitos",
      url: "/dashboard/depositos",
      icon: HandCoinsIcon,
    },
        {
      name: "Sportsbook",
      url: "/dashboard/sportsbook",
      icon: BookIcon,
    },
    {
      name: "Alcances",
      url: "/dashboard/alcances",
      icon: ChartLineIcon,
    },
    {
      name: "Benchmark",
      url: "/dashboard/benchmark",
      icon: ChartNoAxesCombinedIcon,
    }
  ],
}

export const AppSidebar = React.memo(function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="ml-10 my-auto max-h-[95cqh] rounded-2xl pl-0" collapsible="icon" {...props}>
      <SidebarHeader className="rounded-t-3xl mt-5 px-6">
        <SidebarGroupLabel className="text-lg font-bold text-foreground">Menú</SidebarGroupLabel>
      </SidebarHeader>
      <SidebarContent className="overflow-hidden ">       
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter className="px-7 group-data-[collapsible=icon]:px-2">
        <SidebarGroupLabel className="text-base px-0 font-bold text-foreground">Filtrar período</SidebarGroupLabel>
        <NavCalendar />
        <NavUser/>
      </SidebarFooter>
      <SidebarRail className="rounded-3xl max-h-[90cqh] my-auto bg-transparent"/>
    </Sidebar>
  )
});
