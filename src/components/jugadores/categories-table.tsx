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
import { Pagination } from "../pagination";
import { ChartColumnDecreasingIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { useContextQuery } from "@/contexts/query-context";

type CategoryTableItem = {
  playerId: string;
  userName: string;
  income: number;
  category: 'Casino' | 'Sport';
}

export function CategoriesTable({pageParam}: {pageParam?: number}) {
  const { queryString } = useContextQuery();
  const { state } = useSidebar();
  const totalPlayersGroupedByCasino = useQuery(getTotalPlayersGroupedByCasino({queryString, pageParam}));

  const tableData: CategoryTableItem[] = totalPlayersGroupedByCasino.data ? [
    ...totalPlayersGroupedByCasino.data.data.Casino.paginatedPlayers.map(player => ({
      ...player,
      category: 'Casino' as const
    })),
    ...totalPlayersGroupedByCasino.data.data.Sport.paginatedPlayers.map(player => ({
      ...player,
      category: 'Sport' as const
    }))
  ] : [];

  const columns: ColumnDef<CategoryTableItem>[] = [
    {
      accessorKey: "userName",
      header: "Usuario",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("userName")}</div>
      ),
    },
    {
      accessorKey: "category",
      header: "Categoría",
      cell: ({ row }) => {
        const category = row.getValue("category") as string;
        return (
          <div className="flex justify-center">
            <Badge 
              variant={category === "Casino" ? "default" : "outline"}
              className="w-fit"
            >
              {category}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "income",
      header: "Ingresos",
      cell: ({ row }) => (
        <div className="text-center font-medium">
          {(row.getValue("income") as number).toLocaleString()}
        </div>
      ),
    },
  ];

  const { table } = useDataTable({
    data: tableData,
    columns,
    pageCount: ((totalPlayersGroupedByCasino.data?.totalPages ?? 1) < 1500 ? (totalPlayersGroupedByCasino.data?.totalPages ?? 1) : 1500),
    enableAdvancedFilter: true,
    initialState: {
      sorting: [{ id: 'income', desc: true }],
      columnPinning: { right: ['actions'] },
    },
    defaultColumn: {
      columns,
      enableColumnFilter: false,
    },
    getRowId: (originalRow) => `${originalRow.playerId}-${originalRow.category}`,
    shallow: false,
    clearOnDefault: true,
  });

  if (totalPlayersGroupedByCasino.isLoading) {
    return <CardLoading className="w-full h-full animate-pulse min-h-[595px]" icon={true} title={true} children={<div className='min-h-[125px] h-full bg-foreground/10 rounded-md animate-pulse' />} />
  }

  if (totalPlayersGroupedByCasino.isError) {
    return <GeneralErrorContent className="w-full h-full min-h-[595px]"/>;
  }

  return (
    <GeneralCard 
      hasFilter={true}
      cardContentClassName="h-full" 
      classNameContainer="min-h-[595px]" 
      isLoading={totalPlayersGroupedByCasino.isFetching} 
      identifier="chart4" 
      title="Jugadores por Categoría" 
      description="Distribución de jugadores entre Casino y Sport"
      Icon={ChartColumnDecreasingIcon}
    >
      <div className="w-full h-full flex flex-col justify-between">
        <Table>
          <TableHeader className=" ">
            <TableRow className={`text-xs !border-b-2 border-foreground !p-0 h-fit ${state === "collapsed" ? "md:text-lg" : "text-xs lg:text-lg"}`}>
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <TableHead 
                    key={header.id}
                    className={`h-fit px-0 ${
                      header.column.id === 'userName' ? 'text-left' : 
                      header.column.id === 'playerId' ? 'text-right' : 
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
                        cell.column.id === 'userName' ? 'text-start px-0' : 
                        cell.column.id === 'playerId' ? 'text-right px-0' : 
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

        <Pagination
          table={table}
          loading={totalPlayersGroupedByCasino.isFetching}
        />
      </div>
    </GeneralCard>
  )
}