import {
  type LucideIcon,
} from "lucide-react"

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { useLocation } from 'react-router';

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {
  const { pathname } = useLocation();

  return (
    <SidebarGroup className="pl-0" >
      <SidebarMenu className="group-data-[collapsible=icon]:pl-0 flex flex-col gap-3 !pl-0">
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <div className="flex relative items-center justify-start gap-6 h-fit w-full pl-6 group-data-[collapsible=icon]:pl-2 ">
                {pathname?.startsWith(`${item.url.toLocaleLowerCase()}`) && 
                  <div className="absolute group-data-[collapsible=icon]:hidden left-0 w-2 h-8 bg-primary-foliatti rounded-r-full transition-all duration-300 ease-in-out animate-in slide-in-from-left-2" />
                }            
                  <SidebarMenuButton asChild>
                    <a href={item.url} className={`flex gap-3 h-fit items-center !text-base justify-start transition-all duration-300 ease-in-out ${
                      pathname?.startsWith(`${item.url.toLocaleLowerCase()}`)
                        ? 'text-primary-foliatti font-bold transform scale-105'
                        : 'hover:text-primary-foliatti/70'
                    }`}>

                    <item.icon strokeWidth={2.5} className="transition-transform duration-300 ease-in-out" />
                    <span className="transition-all duration-300 ease-in-out">{item.name}</span>
                  </a>
                </SidebarMenuButton>
            </div>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}