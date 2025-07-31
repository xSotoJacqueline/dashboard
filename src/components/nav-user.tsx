

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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useUser } from "@clerk/clerk-react"
import { SignOutButton,  } from '@clerk/clerk-react'
import { UserProfile,  } from '@clerk/clerk-react'
import {
  Dialog,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils"
import { ThemeSwitcher } from "./theme-switcher"

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
                className="data-[state=open]:bg-sidebar-accent px-0  data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="size-8 rounded-full">
                  <AvatarImage src={clerkUser?.imageUrl} alt={clerkUser?.username || clerkUser?.primaryEmailAddress?.emailAddress} />
                  <AvatarFallback className="rounded-full">{clerkUser?.username?.[0] || clerkUser?.firstName?.[0] || 'U'}</AvatarFallback>
                </Avatar>
              
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate font-bold text-base line-clamp-1">{clerkUser?.username}</span>
                  <span className="truncate text-xs line-clamp-1">{clerkUser?.primaryEmailAddress?.emailAddress}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
           ) : (
                <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent px-0 h-fit data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="size-8 rounded-full">
                  <AvatarFallback className="rounded-full">{''}</AvatarFallback>
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
            <DropdownMenuItem asChild >
              <ThemeSwitcher />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
               <Dialog>
              
                  <DialogTrigger className={cn(buttonVariants({ variant:"ghost", size:"sm", className:"w-full justify-start font-normal focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4" }))} >
                    <BadgeCheck />
                      Cuenta
                  </DialogTrigger>
                  <DialogContent className="!max-w-fit w-fit h-fit p-0">
                    <DialogHeader className="sr-only">
                      <DialogTitle className="text-lg font-semibold">Perfil de Usuario</DialogTitle>
                      <DialogDescription className="text-sm text-muted-foreground">
                        Aquí puedes ver y editar tu información de usuario.
                      </DialogDescription>
                    </DialogHeader>
                    <UserProfile   appearance = {{elements:{menuItem__emailAddresses:{display:"none"}, profileSection__emailAddresses: {display:"none"} } }}/>

                  </DialogContent>
              </Dialog>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <SignOutButton>
              <DropdownMenuItem>
                <LogOut />
                Cerrar sesión
              </DropdownMenuItem>
            </SignOutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
