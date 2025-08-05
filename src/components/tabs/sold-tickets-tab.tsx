import { TicketCheckIcon, TicketIcon, CloverIcon, Volleyball } from "lucide-react";
import { TicketsTable } from "../sportbooks/tickets-table";
import { EarningsProgressCard } from "../sportbooks/earnings-progress-card";

export default function SoldTicketsTab() {
  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-6">
      <TicketsTable identifier="chart3" title="Eventos con más tickets" description="Top 5 por número de tickets vendidos" Icon={TicketCheckIcon} />
      <TicketsTable identifier="chart4" title="Tickets por liga" description="Distribución por liga deportiva" Icon={TicketIcon} />
      <EarningsProgressCard identifier="chart5" title="Tickets por casino" description="Distribución por ubicación" Icon={CloverIcon} />
      <EarningsProgressCard identifier="chart6" title="Tickets por deporte" description="Distribución por categoría deportiva" Icon={Volleyball} />
    </div>
  );
}
