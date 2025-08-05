import type { useAuth } from "@clerk/clerk-react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
    Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useTheme } from '@/hooks/use-theme'
import NotFound from "@/components/notfound";

const queryClient = new QueryClient()

ReactQueryDevtools
interface RootRouteContext {
  auth?: ReturnType<typeof useAuth>;
}

const RootComponent = () => {
  useTheme();
  
  return (
    <QueryClientProvider client={queryClient}>
      <main className="w-full h-full fixed overflow-hidden mx-auto flex justify-center bg-[#F7F7F7] dark:bg-[#1f1e1e]">
          <Outlet />
        
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
      </main>
    </QueryClientProvider>
  );
};

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: RootComponent,
   notFoundComponent: () => {
    return <NotFound />
  },
});