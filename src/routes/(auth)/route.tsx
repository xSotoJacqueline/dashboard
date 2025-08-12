import { useTheme } from "@/hooks/use-theme";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute('/(auth)')({
  component: RouteComponent,
});

function RouteComponent() {
  useTheme();
  return (
    <div className=" w-full h-full flex justify-center items-center">
      <Outlet />
    </div>
  );
}