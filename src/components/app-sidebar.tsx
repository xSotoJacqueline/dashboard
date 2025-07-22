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

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  projects: [
    {
      name: "Retiros",
      url: "#",
      icon: CreditCardIcon,
    },
    {
      name: "Métricas",
      url: "#",
      icon: ChartLineIcon,
    },
    {
      name: "Marketing",
      url: "#",
      icon: SpeechIcon,
    },
    {
      name: "Jugadores",
      url: "#",
      icon: UserIcon,
    },    {
      name: "Bonos",
      url: "#",
      icon: GiftIcon,
    },
    {
      name: "Depósitos",
      url: "#",
      icon: HandCoinsIcon,
    },
        {
      name: "Sportsbook",
      url: "#",
      icon: BookIcon,
    },
    {
      name: "Alcances",
      url: "#",
      icon: ChartLineIcon,
    },
    {
      name: "Benchmark",
      url: "#",
      icon: ChartNoAxesCombinedIcon,
    }

  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="ml-10 my-auto max-h-[95vh] rounded-2xl border-2 bg-sidebar pl-0" collapsible="icon" {...props}>
      <SidebarHeader className="rounded-t-3xl mt-5 px-6">
        <SidebarGroupLabel className="text-lg font-bold text-black">Menú</SidebarGroupLabel>
      </SidebarHeader>
      <SidebarContent className="overflow-hidden">       
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter className="px-7">
        <NavCalendar />
        <NavUser/>
      </SidebarFooter>
      <SidebarRail className="rounded-3xl max-h-[90cqh] my-auto"/>
    </Sidebar>
  )
}
