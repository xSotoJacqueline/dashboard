import { Outlet, redirect } from 'react-router';
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Scroller } from "@/components/ui/scroller";
import type { Route } from './+types/_layout';
import { getAuth } from '@clerk/react-router/ssr.server';
import { Toaster } from 'sonner';


export async function loader(args: Route.LoaderArgs) {
  const CLERK_SIGN_IN_FORCE_REDIRECT_URL = process.env.CLERK_SIGN_IN_FORCE_REDIRECT_URL
  const CLERK_SIGN_IN_URL = process.env.CLERK_SIGN_IN_URL
  if (!CLERK_SIGN_IN_FORCE_REDIRECT_URL) {
    throw new Error('Add your Clerk Sign In Force Redirect URL to the .env file')
  }else if (!CLERK_SIGN_IN_URL) {
    throw new Error('Add your Clerk Sign In URL to the .env file')
  }
  const { userId } = await getAuth(args)
    if (!userId) {
    return redirect(`${CLERK_SIGN_IN_URL}/sign-in?redirect_url=${CLERK_SIGN_IN_FORCE_REDIRECT_URL}/retiros`)
  }  
}

export default function Layout() {

  return (
    <div className="h-screen w-scree bg-[#F7F7F7] mx-auto flex justify-center items-center">
      <div className='w-full relative'>
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className='md:ml-15 w-full  mx-5 sm:mx-10  my-auto max-h-[95vh] overflow-hidden bg-[#F7F7F7]'>
                <header className=" md:hidden md:fix flex h-fit shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <SidebarTrigger className="-ml-1" />
                </header>
                <Scroller hideScrollbar className='h-[95vh] overflow-x-hidden '>
                    <Outlet />
                    <Toaster richColors position='bottom-right' className='' />
                </Scroller>
            </SidebarInset>
        </SidebarProvider>
      </div>

    </div>
  )
}