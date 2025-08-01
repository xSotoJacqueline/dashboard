import { useTheme } from '@/hooks/use-theme'
import { SignIn } from '@clerk/clerk-react'
import { createFileRoute } from '@tanstack/react-router'
import { dark } from '@clerk/themes'

export const Route = createFileRoute('/(auth)/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isDarkMode } = useTheme();
  return <SignIn appearance={{theme: isDarkMode ? dark : "simple"}}/>
}