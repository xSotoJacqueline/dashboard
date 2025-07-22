import { Outlet } from 'react-router';
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Scroller } from "@/components/ui/scroller";
import { useUser } from '@clerk/react-router';


export default function Layout() {
  const { isSignedIn, user, isLoaded } = useUser()
  console.log('isSignedIn', isSignedIn)
  console.log('user', user)
  console.log('isLoaded', isLoaded)
  return (

    <div className="h-screen w-screen bg-[#ece9e9]">
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className='md:ml-15  mx-5 sm:mx-10 max-w-full  my-auto max-h-[95vh] overflow-hidden bg-[#ece9e9]'>
                <header className=" md:hidden md:fix flex h-fit shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <SidebarTrigger className="-ml-1" />
                </header>
                <Scroller hideScrollbar className='h-[95vh] overflow-x-hidden'>
                    <Outlet />
                </Scroller>
            </SidebarInset>
        </SidebarProvider>
    </div>
  )
}