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
import { useDataTable } from "@/lib/use-data-table"
import { Pagination } from "../pagination";

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
        <Pagination
          table={table}
          loading={losersData.isFetching}
        />
      </div>
    </GeneralCard>
  )
}
