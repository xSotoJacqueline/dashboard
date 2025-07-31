import { ChartColumnDecreasingIcon } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { GeneralCard } from "../general-card";

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

export default function TopUsersTab() {
  
  return (
    <GeneralCard identifier="chart1" title="Días en los que más retiros se realizan" description="Jugadores con menos ganancias" Icon={ChartColumnDecreasingIcon}>
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
            <TableRow className="border-0 text-primary h-2" />

            {losersData.map((loser) => (
              <TableRow className="border-0 text-primary" key={loser.username}>
                <TableCell className="text-start px-0">{loser.username}</TableCell>
                <TableCell className="text-center px-0">{loser.earnings}</TableCell>
                <TableCell className="text-center px-0">{loser.gamesPlayed}</TableCell>
                <TableCell className="text-right px-0">{loser.winRate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </GeneralCard>
  )
}
