import { Button, buttonVariants } from '@/components/ui/button';
import { createFileRoute, Link } from '@tanstack/react-router'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { dark } from '@clerk/themes'
import { useTheme } from "@/hooks/use-theme"

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isDarkMode } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full max-w-7xl mx-5">
      <header className="my-4 bg-background w-full rounded-lg p-4 flex justify-between items-center">
        <h1 className="text-lg font-medium">Dashboard</h1>
        <div className="flex items-center gap-4 w- justify-end">
          <SignedOut>
            <SignInButton mode="modal" appearance = {{theme: isDarkMode ? dark : "simple" }}>
              <Button variant={"outline"}>Iniciar sesión</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className='w-full flex items-center justify-between gap-4'>
              <Link className={buttonVariants({ variant: "link" })} to="/dashboard/retiros">Entrar</Link>
              <UserButton  appearance = {{elements:{menuItem__emailAddresses:{display:"none"}, profileSection__emailAddresses: {display:"none"} }, theme: isDarkMode ? dark : "simple" }} />
            </div>
          </SignedIn>
        </div>
      </header>
      <div className="justify-center items-center h-full">
      </div>

    </div>
  );
}