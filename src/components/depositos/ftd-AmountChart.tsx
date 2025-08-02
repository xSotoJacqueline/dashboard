import { FullSizeCard } from "../fullSize-Card";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "../ui/chart";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FTDMountByDayQueryOptions } from "@/queryOptions/queryOptions";

export function FTDAmountChart() {
    const { data: ftdMount } = useSuspenseQuery(FTDMountByDayQueryOptions());
    const chartConfig = {
        desktop: {
        label: "Desktop",
        color: "var(--green-foliatti)",
        },
        mobile: {
        label: "Mobile",
        color: "var(--green-foliatti)",
        },
    } satisfies ChartConfig

    return (
        <FullSizeCard identifier="chart3" cardContentClassName="min-h-[120px]" title="Monto FTD’s por día" description="Monto promedio de los primeros depósitos">
            <div style={{containerType: "size"}} className="w-full h-full min-h-[120px]">
                <ChartContainer config={chartConfig} className={`h-[100cqh] min-h-[120px] !aspect-auto`}>
                    <BarChart
                        accessibilityLayer
                        data={ftdMount}
                        margin={{
                        left: 0
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={2}
                        minTickGap={5}
                        tickFormatter={(value) => {
                            const date = new Date(value)
                            return date.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            })
                        }}
                        />
                        <YAxis
                        type="number"
                        domain={[0, "dataMax"]}
                        tickFormatter={(value) => `${value}`}
                        />
                        <ChartTooltip
                        content={
                            <ChartTooltipContent
                            className="w-[150px]"
                            nameKey="total"
                            labelFormatter={(value) => {
                                return new Date(value).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                })
                            }}
                            />
                        }
                        />
                        <Bar dataKey="total" fill="var(--color-green-foliatti)" radius={8} />
                    </BarChart>
                </ChartContainer>
            </div>
        </FullSizeCard>
    );
}