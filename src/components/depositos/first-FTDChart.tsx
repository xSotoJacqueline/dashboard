import { FullSizeCard } from "../fullSize-Card";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "../ui/chart";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FTDQuantityByDayQueryOptions } from "@/queryOptions/queryOptions";
import { toast } from "sonner";

export function FirstFTDChart() {

    const { data: ftdMount, error } = useSuspenseQuery(FTDQuantityByDayQueryOptions());
    if (error) {
        toast.error("Error al cargar los depósitos");
        return
    }

    const chartConfig = {
        ftdMount: {
        label: "date",
        color: "var(--green-foliatti)",
        },
    } satisfies ChartConfig

    return (
        <FullSizeCard identifier="chart2" cardContentClassName="min-h-[120px]" title="FTD’s diarios" description="(Primeros depósitos)">
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
            tickMargin={8}
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
        tickMargin={2}
        />
        <ChartTooltip
        content={
            <ChartTooltipContent
            className="w-[150px]"
            nameKey="total"
            />
        }
        />
        <Bar dataKey="total" fill="var(--color-primary-foliatti)" radius={8} />
                    </BarChart>
                </ChartContainer>
            </div>
        </FullSizeCard>
    );
}