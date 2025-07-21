import { Outlet } from 'react-router';
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Layout() {
  return (
    <div className="h-screen w-screen">
        <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
                />
            
            </div>
            </header>
            <div className=" ">
                <Outlet />
            </div>
        </SidebarInset>
        </SidebarProvider>
    </div>
  )
}