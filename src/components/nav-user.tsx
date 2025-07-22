

import {
  BadgeCheck,
  ChevronsUpDown,
  LogOut,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useUser } from '@clerk/react-router';
import { SignOutButton,  } from '@clerk/clerk-react'
import { UserProfile,  } from '@clerk/clerk-react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils"
export function NavUser() {
  const { isSignedIn, user: clerkUser, isLoaded } = useUser()

  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>

          {isLoaded && clerkUser && isSignedIn ? (
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={clerkUser?.imageUrl} alt={clerkUser?.username || clerkUser?.primaryEmailAddress?.emailAddress} />
                  <AvatarFallback className="rounded-lg">{clerkUser?.username?.[0] || clerkUser?.firstName?.[0] || 'U'}</AvatarFallback>
                </Avatar>
              
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{clerkUser?.username}</span>
                  <span className="truncate text-xs">{clerkUser?.primaryEmailAddress?.emailAddress}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
           ) : (
                <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">{''}</AvatarFallback>
                </Avatar>
              
                <div className="grid flex-1 text-left gap-2 text-sm leading-tight">
                  <div className="truncate font-medium w-1/2 h-2 rounded-full bg-zinc-300 animate-pulse"/>
                  <div className="truncate font-medium w-full h-2 rounded-full bg-zinc-300 animate-pulse"/>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
              )}
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={clerkUser?.imageUrl} alt={clerkUser?.username || clerkUser?.primaryEmailAddress?.emailAddress} />
                  <AvatarFallback className="rounded-lg">{clerkUser?.username?.[0] || clerkUser?.firstName?.[0] || 'U'}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{clerkUser?.username}</span>
                  <span className="truncate text-xs">{clerkUser?.primaryEmailAddress?.emailAddress}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
               <Dialog>

                  <DialogTrigger className={cn(buttonVariants({ variant:"ghost", size:"sm", className:"w-full justify-start font-normal focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4" }))} >
                    <BadgeCheck />
                      Account
                  </DialogTrigger>
                  <DialogContent className="!max-w-fit w-fit h-fit">
                    <UserProfile />

                  </DialogContent>
              </Dialog>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <SignOutButton>
              <DropdownMenuItem>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </SignOutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
