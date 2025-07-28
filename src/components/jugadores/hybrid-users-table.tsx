import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useSidebar } from "../ui/sidebar";

type HybridUsers = {
  cuantity: number;
  twoVerticals: number;
  threeVerticals: number;
  averageBet: number;
}

const hybridUsersData: HybridUsers[] = [
  { cuantity: 1, twoVerticals: 1, threeVerticals: 1, averageBet: 1500 },
]


export function HybridUsersTable() {
  const { state } = useSidebar();
  return (
    <Card className="h-full w-full flex border-0 gap-2">
        <CardHeader className="">
            <CardTitle className="font-semibold text-xl">Usuarios híbridos<span className="text-foreground text-base font-normal pl-2">(Jugadores que juegan en múltiples verticales)</span></CardTitle>
        </CardHeader>
        <CardContent className="h-fit w-full flex sm:flex-row flex-col justify-center items-center sm:items-stretch sm:justify-between">
           <div className="w-full h-full">
              <Table>
                <TableHeader className=" ">
                  <TableRow className={`text-xs !border-b-2 border-foreground !p-0 h-fit ${state === "collapsed" ? "md:text-lg" : "text-xs lg:text-lg"}`}>
                    <TableHead className="text-start h-fit px-0">Cantidad de usuarios híbridos</TableHead>
                    <TableHead className="text-center h-fit px-0">2 vérticales</TableHead>
                    <TableHead className="text-center h-fit px-0">3 vérticales</TableHead>
                    <TableHead className="text-end h-fit px-0">Apuesta promedio</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="border-0">
                  <TableRow className="border-0 text-primary-foliatti h-2" />

                  {hybridUsersData.map((users, index) => (
                    <TableRow className="border-0 text-primary-foliatti" key={index}>
                      <TableCell className="text-start px-0">{users.cuantity}</TableCell>
                      <TableCell className="text-center px-0">{users.twoVerticals}</TableCell>
                      <TableCell className="text-center px-0">{users.threeVerticals}</TableCell>
                      <TableCell className="text-end px-0">{users.averageBet}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </div>
        </CardContent>

    </Card>
  )
}
