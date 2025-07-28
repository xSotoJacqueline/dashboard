import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
    <Card className="h-full w-full flex border-0 gap-2">
        <CardHeader className="">
            <div className="flex items-center gap-2">
              <MedalIcon className="w-5 h-5 text-primary-foliatti" />
              <CardTitle className="font-semibold text-lg">Ranking de redenciones por bono</CardTitle>
            </div>
            <CardDescription>Número de redenciones por bono en los últimos 28 días</CardDescription>
        </CardHeader>
        <CardContent className="h-fit w-full flex sm:flex-row flex-col justify-center items-center sm:items-stretch sm:justify-between">
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
        </CardContent>

    </Card>
  )
}
