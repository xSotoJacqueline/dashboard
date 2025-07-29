import { DepositMethodsTable } from "../sportbooks/deposit-methods-table";
import { WithDrawMethodsTable } from "../sportbooks/withdraw-methods-table";

export default function TransactionsTab() {
  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-6">
      <DepositMethodsTable />
      <WithDrawMethodsTable />
    </div>
  );
}
