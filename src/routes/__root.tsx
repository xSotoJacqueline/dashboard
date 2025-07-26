import type { useAuth } from "@clerk/clerk-react";
import {
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

interface RootRouteContext {
  auth?: ReturnType<typeof useAuth>;
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: () => (
    <main className="w-full h-screen mx-auto flex justify-center bg-[#ededed]">
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </main>
  ),
});