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
import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

type HybridPlayerTableItem = {
  userId: string;
  user_name: string;
  game_type: FavoriteGame[];
  casino: FavoriteCasino[];
  real_money_bets: number;
}

export function HybridUsersDetailsTable() {
  const { state, isMobile } = useSidebar();
  const { queryString } = useContextQuery();
  const search = useSearch({ from: '/dashboard/jugadores' });
  const page = search.page || 1;
  const FilterStructure = search.filters || [];
  const joinOperator = search.joinOperator || "and";
  const hybridUsersDetails = useQuery(getHybridPlayersDetails({queryString, pageParam: page, filters: FilterStructure, joinOperator: joinOperator}));

  const [selectedGame, setSelectedGame] = useState<FavoriteGame & {userName: string} | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleGameClick = (game: FavoriteGame, userName: string) => {
    setSelectedGame({ ...game, userName });
    setIsDialogOpen(true);
  };
  const tableData: HybridPlayerTableItem[] = hybridUsersDetails.data ? 
    Object.entries(hybridUsersDetails.data.data).map(([userId, playerData]) => ({
      userId,
      user_name: playerData.userName,
      game_type: playerData.favoriteGames,
      casino: playerData.favoriteCasinos,
      real_money_bets: playerData.totalGenerated
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
        const userName = row.getValue("user_name") as string;

        return (
          <div className="flex items-center justify-center w-full">
            <div className="flex items-center justify-center gap-1 flex-wrap min-w-[200px]">
              { 
                favoriteGames.length > (isMobile ? 1 : 2) ? (
                  <>
                    {favoriteGames.slice(0, isMobile ? 1 : 2).map((game, index) => (
                      <Badge 
                        key={`${game.game}-${index}`} 
                        className="w-fit cursor-pointer hover:opacity-80 transition-opacity"
                        variant={
                          game.game === "SLOT_GAME" ? "default" : 
                          game.game === "POKER" ? "outline" : 
                          game.game === "BLACKJACK" ? "secondary" :
                          game.game === "ROULETTE" ? "destructive" :
                          "secondary"
                        }
                        onClick={() => handleGameClick(game, userName)}
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
                          key={`${game.game}-${index}`} 
                          className="w-fit cursor-pointer hover:opacity-80 transition-opacity"
                          variant={
                            game.game === "SLOT_GAME" ? "default" : 
                            game.game === "POKER" ? "outline" : 
                            game.game === "BLACKJACK" ? "secondary" :
                            game.game === "ROULETTE" ? "destructive" :
                            "secondary"
                          }
                        onClick={() => handleGameClick(game, userName)}
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
                      className="w-fit cursor-pointer hover:opacity-80 transition-opacity"
                      variant={
                        game.game === "SLOT_GAME" ? "default" : 
                        game.game === "POKER" ? "outline" : 
                        game.game === "BLACKJACK" ? "secondary" :
                        game.game === "ROULETTE" ? "destructive" :
                        "secondary"
                      }
                        onClick={() => handleGameClick(game, userName)}
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
        variant: "multiSelect",
        options: Object.values(["SLOT_GAME", "POKER", "BLACKJACK", "ROULETTE", "BACCARAT", "CASINO_HOLDEM", "CRASH", "KENO", "LOTTERY", "OTHERS", "RNG_TABLE_GAME", "SCRATCH_CARD", "SHOW_PROGRAM"]).map((possibility) => ({
          label: possibility.charAt(0).toUpperCase() + possibility.slice(1).toLowerCase().replace("_", " "),
          value: possibility,
        })),  
      },
      enableColumnFilter: true,
    },
    {
      accessorKey: "real_money_bets",
      header: "Total apostado",
      cell: ({ row }) => {
        const totalGenerated = row.getValue("real_money_bets") as number;
        return (
          <div className="text-center">
            <span>{totalGenerated.toLocaleString()}</span>
          </div>
        );
      },
      meta:{
        label: 'Total apostado',
        variant: "number"
      }

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
    <>
      <GeneralCard 
        hasFilter={true}
        cardContentClassName="h-full min-h-fit"
        className=""
        classNameContainer="sm:min-h-[595px] min-h-[700px] h-fit"
        isLoading={hybridUsersDetails.isFetching}
        identifier="chart3"
        title="Detalles de usuarios híbridos"
        Icon={ChartColumnDecreasingIcon}
        headerButtonChildren={
          <DataTableFilterList 
                loading={false}
                table={table}
                shallow={shallow}
                debounceMs={debounceMs}
                throttleMs={throttleMs}
                align="start"
            />
        }
        
      >
          <div className="w-full h-full flex flex-col justify-between gap-2">
            
            {hybridUsersDetails.isError ? <GeneralErrorContent /> : 
              <div className="flex flex-col h-full justify-between min-h-fit ">
                <div className="overflow-x-auto">
                  <Table className="h-full min-h-[400px]" >
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
                    <TableBody isLoading={hybridUsersDetails.isFetching} className="border-0 h-full ">
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
      {/* Game Sessions Dialog */}
      <Drawer open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DrawerContent  className="z-9999 h-[100dvh] sm:h-[90dvh] !max-h-screen w-full">
            <DrawerHeader>
              <DrawerTitle>
                {selectedGame?.userName}
              </DrawerTitle>
              <DrawerDescription className="mb-2">
                Sesiones de {selectedGame?.game} ({selectedGame?.count} sesiones)
              </DrawerDescription>
            </DrawerHeader>
              {selectedGame && (
                <section className="flex px-6 flex-col h-full items-center justify-start w-full gap-0">
                  <div className="grid grid-cols-1 flex-1 items-center w-full justify-center sm:grid-cols-2 gap-4 mb-6 p-4 bg-muted rounded-lg">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Total Dinero Real Apostado</p>
                        <p className="text-lg font-semibold">{selectedGame.totalRealMoneyBets.toLocaleString()}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Total Dinero Real Ganado</p>
                        <p className="text-lg font-semibold">{selectedGame.totalRealMoneyWins.toLocaleString()}</p>
                      </div>
                  </div>
                  <ScrollArea className="h-[40dvh] sm:h-[45dvh] w-full">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Casino</TableHead>
                            {/* <TableHead className="text-right">Apuestas</TableHead> */}
                            <TableHead className="text-right">Dinero Real Apostado</TableHead>
                            <TableHead className="text-right">Dinero Real Ganado</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedGame.sessions.map((session, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                {session.betDate
                                  ?
                                  new Date(session.betDate).toLocaleDateString('es-ES', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                  })
                                  : ""}
                              </TableCell>
                              <TableCell>
                                <Badge variant={session.casino === "Casino" ? "default" : "outline"}>
                                  {session.casino}
                                </Badge>
                              </TableCell>
                              {/* <TableCell className="text-right">{session.numberOfBets.toLocaleString()}</TableCell> */}
                              <TableCell className="text-right">{session.realMoneyBets.toLocaleString()}</TableCell>
                              <TableCell className="text-right">{session.realMoneyWins.toLocaleString()}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <ScrollBar orientation="horizontal" />

                  </ScrollArea>
                </section>

              )}

            <DrawerFooter>
              <DrawerClose className="w-full">
                <Button variant="default" className="w-full">Cerrar</Button>
              </DrawerClose>
            </DrawerFooter>
        </DrawerContent>
      </Drawer>
  </>

  )
}