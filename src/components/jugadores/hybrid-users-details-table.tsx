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
import { useQuery } from "@tanstack/react-query";
import { getHybridPlayersDetails, type PlayerData } from "@/queryOptions/queryOptions-jugadores";
import {
  type ColumnDef,
  flexRender,
} from "@tanstack/react-table"
import { ChartColumnDecreasingIcon, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { useDataTable } from "@/lib/use-data-table"
import { Button } from "@/components/ui/button"
import NumberFlow from "@number-flow/react";
import { GeneralEmptyContent } from "../general-empty-content";
import { GeneralErrorContent } from "../general-error-content";
import CardLoading from "../loading-card";
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { GeneralCard } from "../general-card";

type HybridPlayerTableItem = {
  userId: string;
  playerData: PlayerData;
}

export function HybridUsersDetailsTable({queryString, pageParam}: {queryString?: string, pageParam?: number}) {
  const { state } = useSidebar();

  const hybridUsersDetails = useQuery(getHybridPlayersDetails({queryString, pageParam}));

const tableData: HybridPlayerTableItem[] = hybridUsersDetails.data ? 
  Object.entries(hybridUsersDetails.data.data).map(([userId, playerData]) => ({
    userId,
    playerData
  })) : [];

const columns: ColumnDef<HybridPlayerTableItem>[] = [
  {
    accessorKey: "userId",
    header: "Usuario",
    cell: ({ row }) => {
      const playerData = row.getValue("playerData") as PlayerData;
      return (
        <div className="flex flex-col">
          <span className="font-medium">{playerData.userName}</span>
          {/* <span className="text-xs text-muted-foreground">{row.getValue("userId")}</span> */}
        </div>
      );
    },
  },
  {
    accessorKey: "playerData",
    header: "Juego",
    cell: ({ row }) => {
      const playerData = row.getValue("playerData") as PlayerData;
      return (
        <div className="flex items-center justify-center w-full">
          <div className="flex items-center justify-center gap-1 flex-wrap">
            {
              playerData.favoriteGames.length > 2 ? (
                <>
                  {playerData.favoriteGames.slice(0, 2).map((game, index) => (
                    <Badge 
                      key={`${game.game}-${index}`} 
                      className="w-fit " 
                      variant={
                        game.game === "SLOT_GAME" ? "default" : 
                        game.game === "POKER" ? "outline" : 
                        game.game === "BLACKJACK" ? "secondary" :
                        game.game === "ROULETTE" ? "destructive" :
                        "secondary"
                      }
                    >
                      {game.game} ({game.count})
                    </Badge>
                  ))}

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-pointer text-muted-foreground hover:text-foreground">
                        + {playerData.favoriteGames.length - 2}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      sideOffset={6}
                      className="bg-accent text-foreground z-[100] border font-semibold dark:bg-zinc-900 p-2"
                    >
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {playerData.favoriteGames.slice(2).map((game, index) => (
                          <Badge
                            key={`tooltip-${game.game}-${index}`}
                            className="w-fit text-xs"
                            variant={
                              game.game === "SLOT_GAME" ? "default" :
                              game.game === "POKER" ? "outline" :
                              game.game === "BLACKJACK" ? "secondary" :
                              game.game === "ROULETTE" ? "destructive" :
                              "secondary"
                            }
                          >
                            {game.game} ({game.count})
                          </Badge>
                        ))}
                      </div>
                    </TooltipContent>
                  </Tooltip>
 
                </>
              ) : (
                playerData.favoriteGames.map((game, index) => (
                  <Badge 
                    key={`${game.game}-${index}`} 
                    className="w-fit " 
                    variant={
                      game.game === "SLOT_GAME" ? "default" : 
                      game.game === "POKER" ? "outline" : 
                      game.game === "BLACKJACK" ? "secondary" :
                      game.game === "ROULETTE" ? "destructive" :
                      "secondary"
                    }
                  >
                    {game.game} ({game.count})
                  </Badge>
                ))
              )
            }
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "playerData",
    header: "Total apostado",
    cell: ({ row }) => {
      const playerData = row.getValue("playerData") as PlayerData;
      return (
        <div className="text-center">
          <span>{playerData.totalGenerated.toLocaleString()}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "playerData",
    header: "Categoría favorita",
    cell: ({ row }) => {
      const playerData = row.getValue("playerData") as PlayerData;
      const favoriteCasino = playerData.favoriteCasinos[0]?.casino || "N/A";
      return (
        <div className="text-right">
          <Badge 
            className="w-fit min-w-16" 
            variant={favoriteCasino === "Casino" ? "default" : favoriteCasino === "Sport" ? "outline" : "secondary"}
          >
            {favoriteCasino}
          </Badge>
        </div>
      );
    },
  },
];


  const { table } = useDataTable({
    data: tableData,
    columns,
    pageCount: hybridUsersDetails.data?.totalPages || 1,
    enableAdvancedFilter: true,
    initialState: {
      sorting: [{ id: 'userId', desc: false }],
      columnPinning: { right: ['actions'] },
    },
    defaultColumn: {
      columns,
      enableColumnFilter: false,
    },
    getRowId: (originalRow) => originalRow.userId,
    shallow: false,
    clearOnDefault: true,
  });

  if (hybridUsersDetails.isLoading) {
    return <CardLoading className="w-full h-full animate-pulse min-h-[595px]" icon={true} title={true} children={<div className='min-h-[125px] h-full bg-foreground/10 rounded-md animate-pulse' />} />
  }

  if (hybridUsersDetails.isError) {
    return <GeneralErrorContent />;
  }

  return (
    <GeneralCard cardContentClassName="h-full" classNameContainer="min-h-[595px]" isLoading={hybridUsersDetails.isFetching} identifier="chart1" title="Detalles de usuarios híbridos" Icon={ChartColumnDecreasingIcon}>
        
        <div className="w-full h-full flex flex-col justify-between">
          <Table>
            <TableHeader className=" ">
              <TableRow className={`text-xs !border-b-2 border-foreground !p-0 h-fit ${state === "collapsed" ? "md:text-lg" : "text-xs lg:text-lg"}`}>
                {table.getHeaderGroups().map((headerGroup) =>
                  headerGroup.headers.map((header) => (
                    <TableHead 
                      key={header.id}
                      className={`h-fit px-0 ${
                        header.column.id === 'userId' ? 'text-left' : 
                        header.column.id === 'playerData' && header.column.columnDef.header === 'Categoría favorita' ? 'text-right' : 
                        'text-center'
                      }`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))
                )}
              </TableRow>
            </TableHeader>
            <TableBody className="border-0">
              <TableRow className="border-0 text-primary h-2" />

              {table.getRowModel().rows?.length < 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    className="border-0 text-primary"
                    key={row.id}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell 
                        className={`${
                          cell.column.id === 'userId' ? 'text-start px-0' : 
                          cell.column.columnDef.header === 'Categoría favorita' ? 'text-right px-0' : cell.column.columnDef.header === 'Juego' ? 'text-center px-0 flex items-center justify-center w-full' : 'text-center px-0'
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
                <TableRow className="h-[400px]">
                  <TableCell
                  colSpan={columns.length}
                  className="h-full min-h-[400px] text-center align-middle p-0"
                  >
                  <div className="flex items-center justify-center h-full w-full min-h-[400px]">
                    <GeneralEmptyContent className="h-full min-h-[380px]" />
                  </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="flex w-full items-center justify-center sm:justify-end gap-1 pt-2">
            <Button
              size={'icon'}
              className="h-fit w-fit p-2"
              variant={'secondary'}
              aria-label="Go to first page"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft size={16} />
            </Button>
            <Button
              size={'icon'}
              className="h-fit w-fit p-2"
              variant={'secondary'}
              disabled={table.getState().pagination.pageIndex + 1 === 1}
              onClick={() => table.previousPage()}
            >
              <ChevronLeft size={16} />
            </Button>
            <div className="mr-2 flex items-end justify-end space-x-1 text-sm tabular-nums">
              <span className="text-muted-foreground justify-end flex min-w-5 items-end text-end">
                <NumberFlow value={table.getState().pagination.pageIndex + 1} />
              </span>
              <span className="text-muted-foreground flex items-center gap-1">
                /{' '}
                {hybridUsersDetails.isFetching ? (
                  <div className="h-4 w-5 animate-pulse rounded-sm bg-slate-200/50" />
                ) : (
                  table.getPageCount()
                )}
              </span>
            </div>
            <Button
              size={'icon'}
              className="h-fit w-fit p-2"
              variant={'secondary'}
              disabled={table.getState().pagination.pageIndex + 1 === table.getPageCount()}
              onClick={() => table.nextPage()}
            >
              <ChevronRight size={16} />
            </Button>
            <Button
              size={'icon'}
              variant={'secondary'}
              className="h-fit w-fit p-2"
              aria-label="Go to last page"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRight size={16} />
            </Button>
          </div>
        </div>
    </GeneralCard>
  )
}