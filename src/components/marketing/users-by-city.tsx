import { GeneralCard } from "../general-card";
import { useQuery } from "@tanstack/react-query";
import { FullSizeCard } from "../fullSize-Card";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "../ui/chart";
import { GeneralErrorContent } from "../general-error-content";
import CardLoading from "../loading-card";
import * as React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table'

import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { usersByCityQueryOptions } from "@/queryOptions/queryOptions-metricas";

export default function UsersByCity() {
  const { data: usersByCity, error, isPending, isFetching, refetch } = useQuery(
      usersByCityQueryOptions(),
  );

  const tableData = usersByCity?.all || [];

  console.log("tableData lenght",tableData.length)
  
    const chartConfig = {
        ftdMount: {
        label: "date",
        color: "var(--green-foliatti)",
        },

    } satisfies ChartConfig

    type UserByCity = {
        city: string;
        activeUsers: string;
    };

    const columns = React.useMemo<ColumnDef<UserByCity>[]>(
      () => [
        {
          accessorKey: 'city',
          header: () => <div className="text-start">Ciudad</div>,
          cell: (info) => (
            <div className="text-start">{String(info.getValue()).slice(0, 30)}</div>
          ),
        },
        {
          accessorKey: 'activeUsers',
          header: 'Usuarios Activos',
          cell: (info) => (
            <div className="text-end">{String(info.getValue())}</div>
          ),
        },
      ],
      [],
    )

    const table = useReactTable<UserByCity>({
      data: tableData,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      debugTable: true,
    })

  const { rows } = table.getRowModel()

  const parentRef = React.useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 20,
    overscan: 10,
  })

  const ChartComponent = React.useMemo(() => {
    return (
      <BarChart
        accessibilityLayer
        data={usersByCity?.top10}
        margin={{
          left: 0
        }}
      >
        <CartesianGrid vertical={true} />
        <XAxis
          dataKey="city"
          tickLine={true}
          axisLine={true}
          tickMargin={8}
        />
        <YAxis
          type="number"
          domain={[0, "dataMax"]}
          tickFormatter={(value) => `${value}`}
          tickMargin={2}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              className="w-[150px]"
              nameKey="activeUsers"
            />
          }
        />
        <Bar dataKey="activeUsers" fill="var(--color-primary-foliatti)" radius={8} />
      </BarChart>
    )
  }, [usersByCity?.top10]);

  if (error){
    return(
      <GeneralErrorContent refetch={refetch} />
    )
  }

  if (isPending || isFetching) {
    return (
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-6 gap-6">
        <CardLoading className="col-span-1 md:col-span-4"/>
        <CardLoading className="col-span-1 md:col-span-2"/>
      </div>
    )
  }

  return (
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-6 gap-6">
          <FullSizeCard identifier="chart3" className="col-span-1 md:col-span-4" cardContentClassName="min-h-[120px]" title="Usuarios activos por ciudad" description="Top 10 ciudades con más usuarios activos">
              <div style={{containerType: "size"}} className="w-full h-full min-h-[120px]">
                  <ChartContainer config={chartConfig} className={`h-[100cqh] min-h-[120px] !aspect-auto`}>
                      {ChartComponent}
                  </ChartContainer>
              </div>
          </FullSizeCard>
              <GeneralCard identifier="char3" title="Usuarios por ciudad" classNameContainer="col-span-1 md:col-span-2" className="max-h-full overflow-hidden" cardContentClassName="h-fit">
                  <div ref={parentRef} className="h-80 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-zinc-300">
                    <div className="relative" style={{ containerType: "size", height: `${virtualizer.getTotalSize()}px` }}>
                      <table className="w-full">
                      
                        <TableBody>
                          {virtualizer.getVirtualItems().map((virtualRow, index) => {
                            const row = rows[virtualRow.index]
                            return (
                              <TableRow
                              className="border-0"
                                key={row.id}
                                style={{
                                  height: `${virtualRow.size}px`,
                                  transform: `translateY(${
                                    virtualRow.start - index * virtualRow.size
                                  }px)`,
                                }}
                              >
                                {row.getVisibleCells().map((cell) => {
                                  return (
                                    <TableCell key={cell.id}>
                                      {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext(),
                                      )}
                                    </TableCell>
                                  )
                                })}
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </table>
                    </div>
                  </div>
              </GeneralCard>
        </div>
  
  )
}

