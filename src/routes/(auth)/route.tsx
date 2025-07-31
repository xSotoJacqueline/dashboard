import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute('/(auth)')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-[#ededed] w-full h-full flex justify-center items-center">
      <Outlet />
    </div>
  );
}