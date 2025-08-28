import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import type { Table } from '@tanstack/react-table';
import NumberFlow from "@number-flow/react";
import { Input } from "./ui/input";

interface DataTablePaginationProps<TData>
  extends React.ComponentProps<'div'> {
  table: Table<TData>;
  pageSizeOptions?: number[];
  loading: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export function Pagination<TData>({
  table,
  loading,
}: DataTablePaginationProps<TData>) { 
   return (
  <section className="flex w-full sm:flex-row flex-col items-center justify-center sm:justify-end gap-1">
     <Input
        type="number"
        min={1}
        className="h-8 max-w-16 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none appearance-none"
        disabled={loading}
        max={table.getPageCount()}
        onKeyDownCapture={
          (e) => {
              if (e.key === "Enter") {
                  const page = Number(e.currentTarget.value) - 1;
                  if (page >= 0 && page < table.getPageCount()) {
                      table.setPageIndex(page);
                  }
              }
          }
        }
      />
    <div className="flex w-full items-center justify-center sm:justify-end gap-1">
      
      <Button
        size={'icon'}
        className="h-fit w-fit p-2"
        variant={'secondary'}
        aria-label="Go to first page"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage() || loading}
      >
        <ChevronsLeft size={16} />
      </Button>
      <Button
        size={'icon'}
        className="h-fit w-fit p-2"
        variant={'secondary'}
        disabled={table.getState().pagination.pageIndex + 1 === 1 || loading}
        onClick={() => table.previousPage()}
      >
        <ChevronLeft size={16} />
      </Button>
      <div className="mr-2 flex items-center justify-end space-x-1 text-sm tabular-nums">
        <span className="text-muted-foreground justify-end flex min-w-5 items-end text-end">
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
        disabled={table.getState().pagination.pageIndex + 1 === table.getPageCount() || loading}
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
        disabled={!table.getCanNextPage() || loading}
      >
        <ChevronsRight size={16} />
      </Button>
    </div>
  </section>
          
  );
}
