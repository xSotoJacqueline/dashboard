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
import { getHybridPlayersDetails, type FavoriteGame, type FavoriteCasino } from "@/queryOptions/queryOptions-jugadores";
import {
  type ColumnDef,
  flexRender,
} from "@tanstack/react-table"
import { ChartColumnDecreasingIcon, CircleDashed } from "lucide-react"
import { useDataTable } from "@/lib/use-data-table"
import { GeneralEmptyContent } from "../general-empty-content";
import { GeneralErrorContent } from "../general-error-content";
import CardLoading from "../loading-card";
import { GeneralCard } from "../general-card";
import { Pagination } from "../pagination";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DataTableFilterList } from "../data-table-filter-list";
import { useSearch } from "@tanstack/react-router";
import { useContextQuery } from "@/contexts/query-context";

type HybridPlayerTableItem = {
  userId: string;
  user_name: string;
  game_type: FavoriteGame[];
  casino: FavoriteCasino[];
  totalGenerated: number;
}

export function HybridUsersDetailsTable({queryString, pageParam}: {queryString?: string, pageParam?: number}) {
  const { state, isMobile } = useSidebar();
  const { labelTimePeriod } = useContextQuery();
  const search = useSearch({ from: '/dashboard/jugadores' });
  const FilterStructure = search.filters || [];
  const joinOperator = search.joinOperator || "and";
  const applyFilters = search.applyFilters || false;
  const hybridUsersDetails = useQuery(getHybridPlayersDetails({queryString, pageParam, filters: applyFilters ? FilterStructure : undefined, joinOperator: joinOperator}));

  const tableData: HybridPlayerTableItem[] = hybridUsersDetails.data ? 
    Object.entries(hybridUsersDetails.data.data).map(([userId, playerData]) => ({
      userId,
      user_name: playerData.userName,
      game_type: playerData.favoriteGames,
      casino: playerData.favoriteCasinos,
      totalGenerated: playerData.totalGenerated
    })) : [];

  const columns: ColumnDef<HybridPlayerTableItem>[] = [
    {
      accessorKey: "user_name",
      header: "Usuario",
      cell: ({ row }) => {
        const userName = row.getValue("user_name") as string;
        return (
          <div className="flex flex-col">
            <span className="font-medium">{userName}</span>
            {/* <span className="text-xs text-muted-foreground">{row.getValue("userId")}</span> */}
          </div>
        );
      },
      enableColumnFilter: true,
    },
    {
      accessorKey: "game_type",
      header: "Juego",
      cell: ({ row }) => {
        const favoriteGames = row.getValue("game_type") as FavoriteGame[];
        return (
          <div className="flex items-center justify-center w-full">
            <div className="flex items-center justify-center gap-1 flex-wrap min-w-[200px]">
              { 

                favoriteGames.length > (isMobile ? 1 : 2) ? (
                  <>
                    {favoriteGames.slice(0, isMobile ? 1 : 2).map((game, index) => (
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

                  <Popover>
                  <PopoverTrigger asChild>
                    <span className="cursor-pointer text-muted-foreground hover:text-foreground select-none">
                      + {favoriteGames.length - (isMobile ? 1 : 2)}
                    </span>
                  </PopoverTrigger>
                  <PopoverContent
                    side="top"
                    sideOffset={6}
                    className="w-auto p-2 bg-accent text-foreground border dark:bg-zinc-900"
                  >
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {favoriteGames.slice(isMobile ? 1 : 2).map((game, index) => (
                        <Badge
                          key={`popover-${game.game}-${index}`}
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
                  </PopoverContent>
                </Popover>

  
                  </>
                ) : (
                  favoriteGames.map((game, index) => (
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
      meta:{
        label: 'Juego',
      },
      enableColumnFilter: true,
    },
    {
      accessorKey: "totalGenerated",
      header: "Total apostado",
      cell: ({ row }) => {
        const totalGenerated = row.getValue("totalGenerated") as number;
        return (
          <div className="text-center">
            <span>{totalGenerated.toLocaleString()}</span>
          </div>
        );
      },
      enableColumnFilter: true,

    },
    {
      accessorKey: "casino",
      header: "Categoría favorita",
      cell: ({ row }) => {
        const favoriteCasinos = row.getValue("casino") as FavoriteCasino[];
        const favoriteCasino = favoriteCasinos[0]?.casino || "N/A";
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

          meta: {
          label: 'Casino',
          variant: 'multiSelect',
          options: Object.values(["Casino", "Sport"]).map((possibility) => ({
            label: possibility.charAt(0).toUpperCase() + possibility.slice(1),
            value: possibility,
            // count: possibilityCounts[possibility], // Assuming you have a way to count these
            icon: CircleDashed,
          })),
        },
      enableColumnFilter: true,
    },
  ];

  const { table, shallow, debounceMs, throttleMs } = useDataTable({
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

  return (
    <GeneralCard labelTimePeriod={labelTimePeriod} cardContentClassName="h-full" className="" classNameContainer="min-h-[595px]" isLoading={hybridUsersDetails.isFetching} identifier="chart3" title="Detalles de usuarios híbridos" Icon={ChartColumnDecreasingIcon}>
        
        <div className="w-full h-full flex flex-col justify-between gap-2">
          <DataTableFilterList 
              loading={false}
              table={table}
              shallow={shallow}
              debounceMs={debounceMs}
              throttleMs={throttleMs}
              align="start"
          />
          {hybridUsersDetails.isError ? <GeneralErrorContent /> : 
            <div className="flex flex-col h-full justify-between ">
              <div className="overflow-x-auto">
                <Table className="" >
                  <TableHeader className=" ">
                    <TableRow className={`text-xs !border-b-2 border-foreground !p-0 h-fit ${state === "collapsed" ? "md:text-base" : "text-xs lg:text-base"}`}>
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

                    {table.getRowModel().rows?.length ? (
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
              </div>
              <Pagination
                table={table}
                loading={hybridUsersDetails.isFetching}
              />
            </div>
          }

        </div>
    </GeneralCard>
  )
}