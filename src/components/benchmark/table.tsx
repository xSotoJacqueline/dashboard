import {
  type ColumnDef,
  flexRender,
} from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { bytesToMegabytes } from "@/lib/unit-convertions"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { TableActionBar } from "../table-action-bar"
import { useDataTable } from "@/lib/use-data-table"
import { xApiKey, type BenchmarkKey } from "@/queryOptions/queryOptions"
import { useSidebar } from "../ui/sidebar"
import { Pagination } from "../pagination"

interface DataColumns {
  id: number;
  key: string;
  name: string;
  size: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export function BenchMarksTable({ data, loading }: { data: BenchmarkKey; loading: boolean }) {
  const queryClient = useQueryClient()
  const { isMobile } = useSidebar();
  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/benchmark/delete/${id}`, {
        method: 'DELETE',
        headers: { 'x-api-key': xApiKey }
      });
      if (!res.ok) {
        throw new Error('Failed to delete benchmark key');
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success('Archivo Eliminado',{ className: "mt-8", position: isMobile ? "top-center" : "bottom-right" });
      queryClient.invalidateQueries({ queryKey: ['benchmarkKeys'] });
    },
    onError: (error) => {
      toast.error(`Error al eliminar archivo: ${error.message}`, { position: isMobile ? "top-center" : "bottom-right" });
    },
  });

  const columns: ColumnDef<DataColumns>[] = [
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
    data: data.data || [],
    columns,
    pageCount: data.totalPages,
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

  return (
    <>
    <div className="w-full h-full flex flex-col justify-between">
      <div className="overflow-hidden">
        <Table className="h-full min-h-56">
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

      <Pagination
        table={table}
        loading={loading}
      />
    </div>

    <TableActionBar isMobile={isMobile} table={table} loading={false} />
    </>



  )
}
