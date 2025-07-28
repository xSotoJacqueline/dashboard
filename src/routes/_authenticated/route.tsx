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

export const Route = createFileRoute('/_authenticated')({
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
    <div className="bg-[#ededed] w-full h-full flex justify-center items-center">
      <div className='w-full relative'>
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className='md:ml-15 w-full  mx-5 sm:mx-10  my-auto max-h-[95vh] overflow-hidden bg-[#ededed]'>
                <header className=" md:hidden md:fix flex h-fit shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <SidebarTrigger className="-ml-1" />
                </header>
                <Scroller hideScrollbar size={activeGame ? 0 : 40} style={{containerType: "size"}} className={`h-[95vh] overflow-x-hidden relative ${activeGame ? "overflow-hidden" : ""}`}>
                    <Outlet />
                    <Toaster richColors position='bottom-right' className='' />
                </Scroller>
            </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  );
}