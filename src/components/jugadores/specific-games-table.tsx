import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useSidebar } from "../ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { getTotalBetsGroupedByGameAndCasino } from "@/queryOptions/queryOptions-jugadores";
import { GeneralEmptyContent } from "../general-empty-content";
import { GeneralErrorContent } from "../general-error-content";
import CardLoading from "../loading-card";
import {
  type ColumnDef,
  flexRender,
} from "@tanstack/react-table"
import { useDataTable } from "@/lib/use-data-table"
import { GeneralCard } from "../general-card";
import { useContextQuery } from "@/contexts/query-context";

type GameTableData = {
  game: string;
  category: string;
  players: number;
  earnings: number;
  averagePerUser: number;
}

export function SpecificGamesTable() {
  const { state } = useSidebar();
  const { labelTimePeriod, queryString } = useContextQuery();
  const gamesData = useQuery(getTotalBetsGroupedByGameAndCasino({queryString}));
  if (gamesData.isLoading) {
    return <CardLoading className="w-full h-full animate-pulse" description={true} title={true} children={<div className='min-h-[125px] h-full bg-foreground/10 rounded-md animate-pulse' />} />
  }

  if (!gamesData.data || gamesData.data === null || (Object.keys(gamesData.data.Casino).length === 0 && Object.keys(gamesData.data.Sport).length === 0)) {
    return <GeneralEmptyContent className="min-h-[35cqh]" />;
  }
  // Transformar los datos de la API al formato de la tabla
  const transformedData: GameTableData[] = [];
  
  if (gamesData.data) {
    Object.entries(gamesData.data.Casino).forEach(([gameType, gameData]) => {
      transformedData.push({
        game: gameType.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
        category: 'Casino',
        players: gameData.totalPlayers,
        earnings: gameData.totalIncome,
        averagePerUser: gameData.averageIncomePerPlayer,
      });
    });

    Object.entries(gamesData.data.Sport).forEach(([gameType, gameData]) => {
        transformedData.push({
          game: gameType.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
          category: 'Sport',
          players: gameData.totalPlayers,
          earnings: gameData.totalIncome,
          averagePerUser: gameData.averageIncomePerPlayer,
        });
    });
  }

  const columns: ColumnDef<GameTableData>[] = [
    {
      accessorKey: "game",
      header: "Juego",
      cell: ({ row }) => (
        <div className="">{row.getValue("game")}</div>
      ),
    },
    {
      accessorKey: "category",
      header: "Categorías",
      cell: ({ row }) => (
        <div className="min-w-[100px]">{row.getValue("category")}</div>
      ),
    },
    {
      accessorKey: "players",
      header: "Jugadores",
      cell: ({ row }) => (
        <div className="min-w-[100px]">{(row.getValue("players") as number).toLocaleString()}</div>
      ),
    },
    {
      accessorKey: "earnings",
      header: "Ingresos",
      cell: ({ row }) => (
        <div className="">${(row.getValue("earnings") as number).toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
      ),
    },
    {
      accessorKey: "averagePerUser",
      header: "Promedio por Usuario",
      cell: ({ row }) => (
        <div className="min-w-[150px]">${(row.getValue("averagePerUser") as number).toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
      ),
    },
  ];

  const { table } = useDataTable({
    data: transformedData || [],
    columns,
    pageCount: 10,
    enableAdvancedFilter: true,
    initialState: {
      sorting: [{ id: 'earnings', desc: true }],
    },
    defaultColumn: {
      columns,
      enableColumnFilter: false,
    },
    getRowId: (originalRow, index) => `${originalRow.game}-${index}`,
    shallow: false,
    clearOnDefault: true,
  });



  if (gamesData.isError) {
    return <GeneralErrorContent />;
  }

  return (
        <GeneralCard labelTimePeriod={labelTimePeriod} classNameContainer="overflow-hidden" className=" min-h-fit" cardContentClassName="h-full" identifier={""} title={""}>
    
          <div className="w-full h-full overflow-x-auto">
          <Table>
            <TableHeader className=" ">
              <TableRow className={`text-xs !border-b-2 border-foreground !p-0 h-fit ${state === "collapsed" ? "text-lg" : "text-xs lg:text-lg"}`}>
                <TableHead className="text-left h-fit px-0">Juego</TableHead>
                <TableHead className="text-center h-fit px-0">Categorías</TableHead>
                <TableHead className="text-center h-fit px-0">Jugadores</TableHead>
                <TableHead className="text-center h-fit px-0">Ingresos</TableHead>
                <TableHead className="text-right h-fit px-0">Promedio por Usuario</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="border-0">
              <TableRow className="border-0 text-primary h-2" />

              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow className="border-0 text-primary" key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell 
                        className={`${
                          cell.column.id === 'game' ? 'text-start px-0' : 
                          cell.column.id === 'category' ? 'text-center px-0' :  
                          cell.column.id === 'players' ? 'text-center px-0' : 
                          cell.column.id === 'earnings' ? 'text-center px-0' : 
                          'text-right px-0'
                        }`} 
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-full text-center"
                  >
                    {/* <GeneralEmptyContent /> */}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {table.getRowModel().rows?.length < 1 && (
            <GeneralEmptyContent className="max-h-[90%]" />
          )}
        </div>
    </GeneralCard>

  )
}