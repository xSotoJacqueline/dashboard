import { DepositMethodsTable } from "../sportbooks/deposit-methods-table";

export default function SoldTicketsTab() {
  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-6">
      <DepositMethodsTable />
      <DepositMethodsTable />
      <DepositMethodsTable />
      <DepositMethodsTable />
    </div>
  );
}
