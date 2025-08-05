import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "../ui/badge"
import { useSidebar } from "../ui/sidebar"

type HybridUsersTableItem = {
  username: string;
  category: string[]
  totalBet: number;
  favoriteCategory: string;
}

const hybridUsersData: HybridUsersTableItem[] = [
  { username: "Jugador1", category: ["Sports", "En Vivo", "Casino"], totalBet: 1500, favoriteCategory: "Casino" },
  { username: "Jugador2", category: ["Sports", "En Vivo", "Casino"], totalBet: 2000, favoriteCategory: "Casino" },
  { username: "Jugador3", category: ["Sports", "e-sports"], totalBet: 1800, favoriteCategory: "Casino" },
  { username: "Jugador4", category: ["Sports", "Casino"], totalBet: 2200, favoriteCategory: "Casino" },
  { username: "Jugador5", category: ["Sports", "Casino"], totalBet: 1700, favoriteCategory: "Sports" },
  { username: "Jugador6", category: ["En Vivo", "Casino"], totalBet: 1600, favoriteCategory: "e-sports" },
]


export function HybridUsersDetailsTable() {
  const { state } = useSidebar();
  return (
    <Card className="h-full w-full flex border-0 gap-2">
        <CardHeader className="">
            <CardTitle className="font-semibold text-xl">Detalles de usuarios híbridos</CardTitle>
        </CardHeader>
        <CardContent className="h-fit w-full flex sm:flex-row flex-col justify-center items-center sm:items-stretch sm:justify-between">
           <div className="w-full h-full">
              <Table>
                <TableHeader className=" ">
                  <TableRow className={`text-xs !border-b-2 border-foreground !p-0 h-fit ${state === "collapsed" ? "md:text-lg" : "text-xs lg:text-lg"}`}>
                    <TableHead className="text-left h-fit px-0">Usuario</TableHead>
                    <TableHead className="text-center h-fit px-0">Categoría</TableHead>
                    <TableHead className="text-center h-fit px-0">Total apostado</TableHead>
                    <TableHead className="text-right h-fit px-0">Categoría favorita</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="border-0">
                  <TableRow className="border-0 text-primary h-2" />

                  {hybridUsersData.map((users) => (
                    <TableRow className="border-0 text-primary" key={users.username}>
                      <TableCell className="text-start px-0">{users.username}</TableCell>
                      <TableCell className="text-center px-0 flex items-center justify-center w-full">
                        <div className="min-w-[200px] flex items-center justify-start gap-1">
                          {users.category.map((category) => <Badge key={category} className="w-fit min-w-16" variant={category === "Casino" ? "default" : category === "Sports" ? "outline" : "secondary"}>{category}</Badge>)}
                        </div>
                      </TableCell>
                      <TableCell className="text-center px-0">{users.totalBet}</TableCell>
                      <TableCell className="text-right px-0"><Badge className="w-fit min-w-16" variant={users.favoriteCategory === "Casino" ? "default" : users.favoriteCategory === "Sports" ? "outline" : "secondary"}>{users.favoriteCategory}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </div>
        </CardContent>

    </Card>
  )
}
