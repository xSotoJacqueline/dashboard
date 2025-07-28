import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-[#F7F7F7] w-full h-screen flex justify-center items-center">
      <Outlet />
    </div>
  );
}