import { useParams } from "react-router";
import type { Route } from "./+types/concerts.$city";

export async function loader({ params }: Route.LoaderArgs) {
  console.log("City parameter:", params.city); // For debugging purposes
}
export default function DashboardLayout() {
    const { city } = useParams();
    console.log("Dashboard ID:", city); // For debugging purposes, you can remove this later

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 p-4 text-amber-800">
        <h1 className="text-lg font-bold text-amber-800">Dashboard</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        <span className="text-amber-800">City: {city}</span>
      </main>
    </div>
  );
}