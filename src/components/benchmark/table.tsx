import {
  type ColumnDef,
  flexRender,
} from "@tanstack/react-table"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { BenchmarkKey } from "./card-files"
import { bytesToMegabytes } from "@/lib/unit-convertions"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { TableActionBar } from "../table-action-bar"
import NumberFlow from "@number-flow/react"
import { useDataTable } from "@/lib/use-data-table"

export type DataColumns = {
  id: number
  key: string
  name: string
  size: string
  createdAt: string
  updatedAt: string
}

export function BenchMarksTable({ data, loading }: { data: BenchmarkKey[]; loading: boolean }) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/benchmark/delete/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete benchmark key');
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success('Archivo Eliminado',{ className: "mb-2" });
      queryClient.invalidateQueries({ queryKey: ['benchmarkKeys'] });
    },
  });

  const columns: ColumnDef<BenchmarkKey>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Archivo",
    cell: ({ row }) => (
    <div className="">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "size",
    header: "Tamaño",
    cell: ({ row }) => {
      const sizeString = row.getValue("size") as string;
      
      // Extract numeric value from the string (e.g., "2635835 bytes")
      const sizeInBytes = parseInt(sizeString.split(" ")[0]);
      
      const sizeInMegabytes = bytesToMegabytes(sizeInBytes);
      return (
        <div className="">
        {sizeInMegabytes} MB
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-right">Fecha de Subida</div>,
    cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"))
        return (
            <div className="text-right">
            {date.toLocaleDateString()} {date.toLocaleTimeString()}
            </div>
        )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
                onClick={() => {
                    toast.warning('Esta acción sera permanente', {
                    action: {
                        label: 'Eliminar',
                        onClick: () => mutate(payment.id),
                    },
                    className: "mb-2 mr-8"
                    });
                }}
            >
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

  const { table } = useDataTable({
    data: data || [],
    columns,
    pageCount: 5,
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

  // const table = useReactTable({
  //   data,
  //   columns,
  //   onSortingChange: setSorting,
  //   onColumnFiltersChange: setColumnFilters,
  //   getCoreRowModel: getCoreRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  //   getSortedRowModel: getSortedRowModel(),
  //   getFilteredRowModel: getFilteredRowModel(),
  //   onColumnVisibilityChange: setColumnVisibility,
  //   onRowSelectionChange: setRowSelection,
  //   state: {
  //     sorting,
  //     columnFilters,
  //     columnVisibility,
  //     rowSelection,
  //   },
  // })

  return (
    <>
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="overflow-hidden">
        <Table className="">
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="border-none">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                 className="border-none"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  Sin Archivos
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

        <div className="mx-auto flex w-full shrink-0 items-center justify-between gap-1 sm:w-fit sm:justify-center">
          <Button
            size={'icon'}
            className="h-fit w-fit p-2"
            variant={'secondary'}
            aria-label="Go to first page"
            onClick={() => table.setPageIndex(0)}
            disabled={loading || !table.getCanPreviousPage()}
          >
            <ChevronsLeft size={16} />
          </Button>
          <Button
            size={'icon'}
            className="h-fit w-fit p-2"
            variant={'secondary'}
            disabled={loading || table.getState().pagination.pageIndex + 1 === 1}
            onClick={() => table.previousPage()}
          >
            <ChevronLeft size={16} />
          </Button>
          <div className="mx-2 flex items-center space-x-1 text-sm tabular-nums">
            <span className="text-muted-foreground flex min-w-5 items-center">
              <NumberFlow value={table.getState().pagination.pageIndex + 1} />
            </span>
            <span className="text-muted-foreground flex items-center gap-1">
              /{' '}
              {loading ? (
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
            disabled={loading || table.getState().pagination.pageIndex + 1 === table.getPageCount()}
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
            disabled={loading || !table.getCanNextPage()}
          >
            <ChevronsRight size={16} />
          </Button>
        </div>
      {/* <div className="flex items-center justify-end space-x-2 pt-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div> */}
    </div>

    <TableActionBar table={table} loading={false} />
    </>



  )
}
