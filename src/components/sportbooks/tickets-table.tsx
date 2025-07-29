import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useSidebar } from "../ui/sidebar";
import { GeneralCard } from "../general-card";
import {
  type LucideIcon,
} from "lucide-react"

type Tickets ={
  event: string;
  tickets: number;
  earnings: number;
}

const ticketsData: Tickets[] = [
  { event: "Evento 1", tickets: 150, earnings: 2000 },
  { event: "Evento 2", tickets: 200, earnings: 2500 },
  { event: "Evento 3", tickets: 180, earnings: 2200 },
  { event: "Evento 4", tickets: 220, earnings: 2700 },
  { event: "Evento 5", tickets: 170, earnings: 2400 },
  { event: "Evento 6", tickets: 160, earnings: 2300 },
  { event: "Evento 7", tickets: 190, earnings: 2600 },
  { event: "Evento 8", tickets: 210, earnings: 2800 },
  { event: "Evento 9", tickets: 230, earnings: 3000 },
  { event: "Evento 10", tickets: 240, earnings: 3200 },
]

export function TicketsTable({title, description, Icon, identifier}: {title: string, description: string, Icon: LucideIcon, identifier: string}) {
  const { state } = useSidebar();

  return (
    <GeneralCard classNameContainer="overflow-visible" className=" min-h-fit" cardContentClassName="h-fit" identifier={identifier} title={title} description={description} Icon={Icon}>
       <div className="w-full h-fit ">
              <Table>
                <TableHeader className=" ">
                  <TableRow className={`text-xs !border-b-2 border-foreground !p-0 h-fit ${state === "collapsed" ? "text-xs md:text-lg" : "text-xs lg:text-lg"}`}>
                    <TableHead className="text-left h-fit px-0">Evento</TableHead>
                    <TableHead className="text-center h-fit px-0">Tickets</TableHead>
                    <TableHead className="text-right h-fit px-0">Ingresos</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="border-0">
                  <TableRow className="border-0 text-primary-foliatti h-2" />

                  {ticketsData.map((deposit) => (
                    <TableRow className="border-0 text-primary-foliatti" key={deposit.event}>
                      <TableCell className="text-start px-0">{deposit.event}</TableCell>
                      <TableCell className="text-center px-0">{deposit.tickets}</TableCell>
                      <TableCell className="text-right px-0">{deposit.earnings}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </div>
    </GeneralCard>
  )
}
