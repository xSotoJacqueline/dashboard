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
import { topLoosers, type TopLoosersData } from "@/queryOptions/queryOptions-jugadores";
import { useQuery } from "@tanstack/react-query";
import { GeneralEmptyContent } from "../general-empty-content";
import { GeneralErrorContent } from "../general-error-content";
import CardLoading from "../loading-card";
import {
  type ColumnDef,
  flexRender,
} from "@tanstack/react-table"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { useDataTable } from "@/lib/use-data-table"
import { Button } from "@/components/ui/button"
import NumberFlow from "@number-flow/react";

export default function TopUsersTab({queryString, pageParam}: {queryString?: string, pageParam?: number}) {

  const losersData = useQuery(topLoosers({queryString, pageParam}));
  
  const columns: ColumnDef<TopLoosersData>[] = [
  {
    accessorKey: "user_name",
    header: "Usuarios",
    cell: ({ row }) => (
    <div className="">{row.getValue("user_name")}</div>
    ),
  },
  {
    accessorKey: "real_money_wins",
    header: "Ganancias",
    cell: ({ row }) => (
    <div className="">{row.getValue("real_money_wins")}</div>
    ),
  },
  {
    accessorKey: "number_of_bets",
    header: "Juegos",
    cell: ({ row }) => (
    <div className="">{row.getValue("number_of_bets")}</div>
    ),
  },
  {
    accessorKey: "wins",
    header: "Win Rate",
    cell: ({ row }) => (
    <div className="">{row.getValue("wins")}</div>
    ),
  },
]

    const { table } = useDataTable({
      data: losersData.data || [],
      columns,
      pageCount: 10,
      enableAdvancedFilter: true,
      initialState: {
        sorting: [{ id: 'id', desc: true }],
        columnPinning: { right: ['actions'] },
      },
      defaultColumn: {
        columns,
        enableColumnFilter: false,
      },
      getRowId: (originalRow) => originalRow.id.toString(),
      shallow: false,
      clearOnDefault: true,
    });
  

  if (losersData.isLoading) {
    return <CardLoading className="w-full h-full animate-pulse" title={true} children={<div className='min-h-[125px] h-full bg-foreground/10 rounded-md animate-pulse' />} />
  }

  if (losersData.isError){
    return <GeneralErrorContent />;
  }

  return (
    <GeneralCard isLoading={losersData.isFetching} identifier="chart1" title="Top perdedores" description="Jugadores con menos ganancias" Icon={ChartColumnDecreasingIcon}>
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


              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    className="border-0 text-primary"
                    key={row.id}
                  >
                    
                    {row.getVisibleCells().map((cell) => (

                      <TableCell className={`${cell.column.id === 'user_name' ? 'text-start px-0' : cell.column.id === 'real_money_wins' ? 'text-center px-0' :  cell.column.id === 'number_of_bets' ? 'text-center px-0' : 'text-right px-0'}`} key={cell.id}>
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
                    <GeneralEmptyContent />
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
              {losersData.isFetching ? (
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
            aria-label="Go to first page"
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
