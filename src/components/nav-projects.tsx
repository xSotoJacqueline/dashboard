import {
  type LucideIcon,
} from "lucide-react"

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "@tanstack/react-router"
import { createSerializer, parseAsBoolean, parseAsTimestamp, useQueryStates } from 'nuqs'  
import { useMemo } from "react"
  
const dateParams = {  
  from: parseAsTimestamp,  
  to: parseAsTimestamp,
    apply: parseAsBoolean.withDefault(false)

}  
const serialize = createSerializer(dateParams)  


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
  const [{ from, to, apply }] = useQueryStates(dateParams)
  const projectItems = useMemo(() => (
    projects.map((item) => {
      let href = serialize(item.url, { from, to, apply })
      if (item.url === '/dashboard/benchmark') {
        href = item.url;
      }
      const isActive = pathname?.startsWith(`${item.url.toLocaleLowerCase()}`)
      return (
        <SidebarMenuItem key={item.name}>
          <div className="flex relative items-center justify-start gap-6 h-fit w-full pl-6 group-data-[collapsible=icon]:pl-2 ">
            {isActive &&
              <div className="absolute left-0 w-2 h-8 bg-primary rounded-r-full transition-all duration-300 ease-in-out animate-in slide-in-from-left-2" />
            }
            <SidebarMenuButton asChild>
              <Link to={href} className={`flex gap-3 h-fit items-center !text-base justify-start transition-all duration-300 ease-in-out ${
                isActive
                  ? 'text-primary font-bold'
                  : 'hover:text-primary/70'
              }`}>
                <item.icon strokeWidth={2.5} className="transition-transform duration-300 ease-in-out" />
                <span className="transition-all duration-300 ease-in-out">{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </div>
        </SidebarMenuItem>
      )
    })
  ), [projects, pathname, from, to, apply])

  return (
    <SidebarGroup className="pl-0" >
      <SidebarMenu className="group-data-[collapsible=icon]:pl-0 flex flex-col gap-3 !pl-0">
        {projectItems}
      </SidebarMenu>
    </SidebarGroup>
  )
}