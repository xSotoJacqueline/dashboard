import { HybridUsersDetailsTable } from "../jugadores/hybrid-users-details-table";

export default function HybridUsersTab({queryString, pageParam}: {queryString?: string, pageParam?: number}) {
  return (
    <div className="w-full h-full flex flex-col gap-6">
      {/* <HybridUsersTable /> */}
      <HybridUsersDetailsTable queryString={queryString} pageParam={pageParam} />
    </div>
  );
}
