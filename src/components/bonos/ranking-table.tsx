import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useSidebar } from "../ui/sidebar";
import { MedalIcon } from "lucide-react";
import { GeneralCard } from '../general-card';

type RankingBonos = {
  bono: string;
  redenciones: number;
}

const rankingBonosData: RankingBonos[] = [
  { bono: "Bono 1", redenciones: 10 },
  { bono: "Bono 2", redenciones: 5 },
  { bono: "Bono 3", redenciones: 8 },
]


export function RankingBonosTable() {
  const { state } = useSidebar();
  return (

    <GeneralCard identifier="chart1" title="Ranking de redenciones por bono" description="Número de redenciones por bono en los últimos 28 días" Icon={MedalIcon}>
           <div className="w-full h-full">
              <Table>
                <TableHeader className=" ">
                  <TableRow className={`text-xs !border-b-2 border-foreground !p-0 h-fit ${state === "collapsed" ? "md:text-lg" : "text-xs lg:text-lg"}`}>
                    <TableHead className="text-start h-fit px-0">Bono</TableHead>
                    <TableHead className="text-end h-fit px-0">Redenciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="border-0">
                  <TableRow className="border-0 text-primary-foliatti h-2" />

                  {rankingBonosData.map((users, index) => (
                    <TableRow className="border-0 text-primary-foliatti" key={index}>
                      <TableCell className="text-start px-0">{users.bono}</TableCell>
                      <TableCell className="text-end px-0">{users.redenciones}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </div>
    </GeneralCard>

  )
}
