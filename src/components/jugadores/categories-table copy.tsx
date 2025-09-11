import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useSidebar } from "../ui/sidebar";
import { getTotalPlayersGroupedByCasino } from "@/queryOptions/queryOptions-jugadores";
import { useQuery } from "@tanstack/react-query";
import { GeneralCard } from "../general-card";
import { GeneralEmptyContent } from "../general-empty-content";
import { GeneralErrorContent } from "../general-error-content";
import CardLoading from "../loading-card";
import {
  type ColumnDef,
  flexRender,
} from "@tanstack/react-table"
import { useDataTable } from "@/lib/use-data-table"
import { ChartColumnDecreasingIcon } from "lucide-react";
import { Badge } from "../ui/badge";

type CategoryTableItem = {
  category: 'Casino' | 'Sport';
  totalPlayers: number;
  totalIncome: number;
  averageIncomePerPlayer: number;
  percentageOfTotalPlayers: number;
}

export function CategoriesTable({queryString, pageParam}: {queryString?: string, pageParam?: number}) {
  const { state } = useSidebar();

  const totalPlayersGroupedByCasino = useQuery(getTotalPlayersGroupedByCasino({queryString, pageParam}));

  const tableData: CategoryTableItem[] = totalPlayersGroupedByCasino.data ? [
    {
      category: 'Casino',
      totalPlayers: totalPlayersGroupedByCasino.data.data.Casino.totalPlayers,
      totalIncome: totalPlayersGroupedByCasino.data.data.Casino.totalIncome,
      averageIncomePerPlayer: totalPlayersGroupedByCasino.data.data.Casino.averageIncomePerPlayer,
      percentageOfTotalPlayers: totalPlayersGroupedByCasino.data.data.Casino.percentageOfTotalPlayers,
    },
    {
      category: 'Sport',
      totalPlayers: totalPlayersGroupedByCasino.data.data.Sport.totalPlayers,
      totalIncome: totalPlayersGroupedByCasino.data.data.Sport.totalIncome,
      averageIncomePerPlayer: totalPlayersGroupedByCasino.data.data.Sport.averageIncomePerPlayer,
      percentageOfTotalPlayers: totalPlayersGroupedByCasino.data.data.Sport.percentageOfTotalPlayers,
    }
  ] : [];

  const columns: ColumnDef<CategoryTableItem>[] = [
    {
      accessorKey: "category",
      header: "Categoría",
      cell: ({ row }) => {
        const category = row.getValue("category") as string;
        return (
          <div className="flex justify-start">
            <Badge 
              variant={category === "Casino" ? "default" : "outline"}
              className="w-fit font-medium"
            >
              {category}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "totalPlayers",
      header: "Total Jugadores",
      cell: ({ row }) => (
        <div className="text-center font-medium">
          {(row.getValue("totalPlayers") as number).toLocaleString()}
        </div>
      ),
    },
    {
      accessorKey: "percentageOfTotalPlayers",
      header: "% del Total",
      cell: ({ row }) => (
        <div className="text-center">
          {(row.getValue("percentageOfTotalPlayers") as number).toFixed(1)}%
        </div>
      ),
    },
    {
      accessorKey: "averageIncomePerPlayer",
      header: "Promedio por Jugador",
      cell: ({ row }) => (
        <div className="text-right font-medium">
          ${(row.getValue("averageIncomePerPlayer") as number).toLocaleString()}
        </div>
      ),
    },
  ];

  const { table } = useDataTable({
    data: tableData,
    columns,
    pageCount: 1,
    enableAdvancedFilter: false,
    initialState: {
      sorting: [{ id: 'totalPlayers', desc: true }],
    },
    defaultColumn: {
      columns,
      enableColumnFilter: false,
    },
    getRowId: (originalRow) => originalRow.category,
    shallow: false,
    clearOnDefault: true,
  });

  if (totalPlayersGroupedByCasino.isLoading) {
    return <CardLoading className="w-full h-full animate-pulse " icon={true} title={true} children={<div className='min-h-[125px] h-full bg-foreground/10 rounded-md animate-pulse' />} />
  }

  if (totalPlayersGroupedByCasino.isError) {
    return <GeneralErrorContent />;
  }

  return (
    <GeneralCard 
      hasFilter={true}
      cardContentClassName="h-full" 
      classNameContainer="h-full" 
      isLoading={totalPlayersGroupedByCasino.isFetching} 
      identifier="chart4" 
      title="Estadísticas por Categoría" 
      description="Comparación entre Casino y Sport"
      Icon={ChartColumnDecreasingIcon}
    >
      <div className="w-full h-full flex flex-col overflow-x-auto justify-between">
        <Table>
          <TableHeader className=" ">
            <TableRow className={`text-xs !border-b-2 border-foreground !p-0 h-fit ${state === "collapsed" ? "md:text-base" : "text-xs lg:text-base"}`}>
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <TableHead 
                    key={header.id}
                    className={`h-fit px-0 ${
                      header.column.id === 'category' ? 'text-left' : 
                      header.column.id === 'averageIncomePerPlayer' ? 'text-right' : 
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
                        cell.column.id === 'category' ? 'text-start px-0' : 
                        cell.column.id === 'averageIncomePerPlayer' ? 'text-right px-0' : 
                        'text-center px-0'
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
              <TableRow className="">
                <TableCell
                colSpan={columns.length}
                className="h-full text-center align-middle p-0"
                >
                <div className="flex items-center justify-center h-full w-full">
                  <GeneralEmptyContent className="h-full" />
                </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </GeneralCard>
  )
}