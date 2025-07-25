import { ChartColumnDecreasingIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type LosersTableItem = {
  username: string;
  earnings: number;
  gamesPlayed: number;
  winRate: number;
}

const losersData: LosersTableItem[] = [
  { username: "Jugador1", earnings: -150, gamesPlayed: 20, winRate: 0.15 },
  { username: "Jugador2", earnings: -200, gamesPlayed: 25, winRate: 0.12 },
  { username: "Jugador3", earnings: -180, gamesPlayed: 30, winRate: 0.10 },
  { username: "Jugador4", earnings: -220, gamesPlayed: 22, winRate: 0.08 },
  { username: "Jugador5", earnings: -170, gamesPlayed: 18, winRate: 0.14 },
  { username: "Jugador6", earnings: -160, gamesPlayed: 28, winRate: 0.11 },
  { username: "Jugador7", earnings: -190, gamesPlayed: 24, winRate: 0.09 },
  { username: "Jugador8", earnings: -210, gamesPlayed: 26, winRate: 0.07 },
  { username: "Jugador9", earnings: -230, gamesPlayed: 21, winRate: 0.06 },
  { username: "Jugador10", earnings: -240, gamesPlayed: 19, winRate: 0.05 },
]


export function LosersTable() {
  
  return (
    <Card className="h-full w-full flex border-0 gap-2">
        <CardHeader className="">
          <div className="flex items-center gap-2">
            <ChartColumnDecreasingIcon className="w-5 h-5 text-primary-foliatti" />
            <CardTitle className="font-semibold text-lg">Días en los que más retiros se realizan</CardTitle>
          </div>

          <CardDescription>Jugadores con menos ganancias</CardDescription>
        </CardHeader>
        <CardContent className="h-fit w-full flex sm:flex-row flex-col justify-center items-center sm:items-stretch sm:justify-between">
           <div className="w-full h-full">
              <Table>
                <TableHeader className=" ">
                  <TableRow className="text-xs sm:text-lg !border-b-2 border-foreground !p-0 h-fit">
                    <TableHead className="text-left h-fit px-0">Usuarios</TableHead>
                    <TableHead className="text-center h-fit px-0">Ganancias</TableHead>
                    <TableHead className="text-center h-fit px-0">Juegos</TableHead>
                    <TableHead className="text-right h-fit px-0">Win Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="border-0">
                  <TableRow className="border-0 text-primary-foliatti h-2" />

                  {losersData.map((loser) => (
                    <TableRow className="border-0 text-primary-foliatti" key={loser.username}>
                      <TableCell className="text-start px-0">{loser.username}</TableCell>
                      <TableCell className="text-center px-0">{loser.earnings}</TableCell>
                      <TableCell className="text-center px-0">{loser.gamesPlayed}</TableCell>
                      <TableCell className="text-right px-0">{loser.winRate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </div>
        </CardContent>

    </Card>
  )
}
