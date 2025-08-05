import { UsersRoundIcon } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { GeneralCard } from "../general-card";

type TableItem = {
  username: string;
  lastBet: Date;
  betsToday: number;
  winRate: number;
  balance: number;
}

const getTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) {
    return "Ahora";
  } else if (diffInMinutes < 60) {
    return `Hace ${diffInMinutes} ${diffInMinutes === 1 ? 'minuto' : 'minutos'}`;
  } else if (diffInHours < 24) {
    return `Hace ${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'}`;
  } else {
    return `Hace ${diffInDays} ${diffInDays === 1 ? 'día' : 'días'}`;
  }
};


const playersData: TableItem[] = [
  { username: "Jugador1", lastBet: new Date(Date.now() - 5 * 60 * 1000), betsToday: 5, winRate: 0.15, balance: 100 }, // hace 5 minutos
  { username: "Jugador2", lastBet: new Date(Date.now() - 2 * 60 * 60 * 1000), betsToday: 3, winRate: 0.12, balance: 200 }, // hace 2 horas
  { username: "Jugador3", lastBet: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), betsToday: 4, winRate: 0.10, balance: 150 }, // hace 1 día
  { username: "Jugador4", lastBet: new Date(Date.now() - 30 * 60 * 1000), betsToday: 2, winRate: 0.08, balance: 250 }, // hace 30 minutos
  { username: "Jugador5", lastBet: new Date(Date.now() - 3 * 60 * 60 * 1000), betsToday: 6, winRate: 0.14, balance: 300 }, // hace 3 horas
  { username: "Jugador6", lastBet: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), betsToday: 1, winRate: 0.11, balance: 350 }, // hace 2 días
  { username: "Jugador7", lastBet: new Date(Date.now() - 45 * 60 * 1000), betsToday: 7, winRate: 0.09, balance: 400 }, // hace 45 minutos
  { username: "Jugador8", lastBet: new Date(Date.now() - 6 * 60 * 60 * 1000), betsToday: 2, winRate: 0.07, balance: 210 }, // hace 6 horas
  { username: "Jugador9", lastBet: new Date(Date.now() - 15 * 60 * 1000), betsToday: 3, winRate: 0.06, balance: 230 }, // hace 15 minutos
  { username: "Jugador10", lastBet: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), betsToday: 4, winRate: 0.05, balance: 240 }, // hace 4 días
]


export default function OnlinePlayersTab() {
  
  return (
    <GeneralCard classNameContainer="overflow-visible" title="Jugadores activos" Icon={UsersRoundIcon}>
      <div className="w-full h-full min-h-fit ">
        <Table>
          <TableHeader className=" ">
            <TableRow className="text-xs sm:text-lg !border-b-2 border-foreground !p-0 h-fit">
              <TableHead className="text-left h-fit px-0">Usuarios</TableHead>
              <TableHead className="text-center h-fit px-0">Última Apuesta</TableHead>
              <TableHead className="text-center h-fit px-0">Apuestas Hoy</TableHead>
              <TableHead className="text-center h-fit px-0">Win Rate</TableHead>
              <TableHead className="text-right h-fit px-0">Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-0">
            <TableRow className="border-0 text-primary h-2" />

            {playersData.map((player) => (
              <TableRow className="border-0 text-primary" key={player.username}>
                <TableCell className="text-start px-0">{player.username}</TableCell>
                <TableCell className="text-center px-0">{getTimeAgo(player.lastBet)}</TableCell>
                <TableCell className="text-center px-0">{player.betsToday}</TableCell>
                <TableCell className="text-center px-0">{player.betsToday}</TableCell>
                <TableCell className="text-right px-0">{player.winRate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </GeneralCard>
  )
}
