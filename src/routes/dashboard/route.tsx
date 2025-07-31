import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Scroller } from "@/components/ui/scroller";
import { Toaster } from 'sonner';
import { useIsActiveStore } from '@/lib/active-full-container'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  errorComponent: ({error}) => <div className="w-full h-full flex items-center justify-center">Error loading authenticated routes: {error.message}</div>,
  async beforeLoad(ctx) {
    const token = await ctx.context.auth?.getToken();
    if (!token)
      throw redirect({
        to: "/login",
      });
  },
});

function RouteComponent() {
  const { activeGame } = useIsActiveStore();

  return (
    <div  style={{containerType: "size"}} className="bg-[#ededed] fixed w-full h-full flex justify-center items-center">
      <div className='w-full h-full relative'>
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset  className='md:ml-15 w-full sm:mx-10  my-auto overflow-visible bg-[#ededed]'>
                <header className=" md:hidden md:fix fixed z-50 flex h-fit shrink-0 items-center gap-2 transition-[width,height] px-5 ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <SidebarTrigger className="-ml-1" />
                </header>
                <Scroller size={activeGame ? 0 : 18} style={{containerType: "size"}} className={`h-[95cqh] p-5  md:p-0 overflow-x-visible ${activeGame ? "overflow-visible" : ""}`}>
                    
                    <div className="w-full h-full">
                      <Outlet />
                    </div>
                    <Toaster richColors position='bottom-right' className='mb-2' />
                </Scroller>
            </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  );
}