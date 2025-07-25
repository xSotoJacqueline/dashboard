import { HybridUsersDetailsTable } from "../jugadores/hybrid-users-details-table";
import { HybridUsersTable } from "../jugadores/hybrid-users-table";

export default function HybridUsersTab() {
  return (
    <div className="w-full h-full flex flex-col gap-6">
      <HybridUsersTable />
      <HybridUsersDetailsTable />
    </div>
  );
}
