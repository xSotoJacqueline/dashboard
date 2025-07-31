import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useSidebar } from "../ui/sidebar";

type SpecificGamesTable = {
  game: string;
  category: string;
  players: number;
  earnings: number;
  averagePerUser: number;
}

const specificGamesData: SpecificGamesTable[] = [
  { game: "Juego1", category: "Aventura", players: 150,
    earnings: 5000, averagePerUser: 33.33 },
  { game: "Juego2", category: "Estrategia", players: 200,
    earnings: 8000, averagePerUser: 40 },
  { game: "Juego3", category: "Acción", players: 180,
    earnings: 6000, averagePerUser: 33.33 },
  { game: "Juego4", category: "Puzzle", players: 120,
    earnings: 3000, averagePerUser: 25 },
  { game: "Juego5", category: "Simulación", players: 160,
    earnings: 7000, averagePerUser: 43.75 },
  { game: "Juego6", category: "RPG", players: 140,
    earnings: 5500, averagePerUser: 39.29 },
  { game: "Juego7", category: "Deportes", players: 130,
    earnings: 4000, averagePerUser: 30.77 },
  { game: "Juego8", category: "Carreras", players: 170,
    earnings: 7500, averagePerUser: 44.12 },
  { game: "Juego9", category: "Lucha", players: 110,
    earnings: 3000, averagePerUser: 27.27 },
]

export function CategoriesTable() {
  const { state } = useSidebar();
  return (
    <Card className="h-fit lg:h-full w-full flex border-0 gap-2">
        <CardContent className="h-fit w-full flex sm:flex-row flex-col justify-center items-center sm:items-stretch sm:justify-between">
           <div className="w-full h-full">
              <Table>
                <TableHeader className=" ">
                  <TableRow className={`text-xs !border-b-2 border-foreground !p-0 h-fit ${state === "collapsed" ? "text-lg" : "text-xs lg:text-lg"}`}>
                    <TableHead className="text-left h-fit px-0">Juego</TableHead>
                    <TableHead className="text-center h-fit px-0">Categorias</TableHead>
                    <TableHead className="text-center h-fit px-0">Jugadores</TableHead>
                    <TableHead className="text-center h-fit px-0">Ingresos</TableHead>
                    <TableHead className="text-right h-fit px-0">Promedio por Usuario</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="border-0">
                  <TableRow className="border-0 text-primary h-2" />

                  {specificGamesData.map((games) => (
                    <TableRow className="border-0 text-primary" key={games.game}>
                      <TableCell className="text-start px-0">{games.game}</TableCell>
                      <TableCell className="text-center px-0">{games.category}</TableCell>
                      <TableCell className="text-center px-0">{games.players}</TableCell>
                      <TableCell className="text-center px-0">{games.earnings}</TableCell>
                      <TableCell className="text-right px-0">{games.averagePerUser}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </div>
        </CardContent>

    </Card>
  )
}
