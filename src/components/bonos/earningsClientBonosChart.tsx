import { FullSizeCard } from "../fullSize-Card";
import { CartesianGrid, XAxis, Area, AreaChart, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "../ui/chart";
import { DollarSignIcon } from "lucide-react";

export function EarningsClientBonosChart() {
    const chartData = [
        { month: "January", desktop: 186, mobile: 80 },
        { month: "February", desktop: 305, mobile: 200 },
        { month: "March", desktop: 237, mobile: 120 },
        { month: "April", desktop: 73, mobile: 190 },
        { month: "May", desktop: 209, mobile: 130 },
        { month: "June", desktop: 214, mobile: 140 },
    ]

    const chartConfig = {
        desktop: {
        label: "Desktop",
        color: "var(--primary)",
        },
        mobile: {
        label: "Mobile",
        color: "var(--chart-2)",
        },
    } satisfies ChartConfig

    return (
        <FullSizeCard identifier="chart3" cardContentClassName="min-h-[120px]" title="Ganancias generadas por cliente con bonos" description="Número total de clientes que han ganado utilizando bonos" Icon={DollarSignIcon}>
            <div style={{containerType: "size"}} className="w-full h-full min-h-[120px]">
                <ChartContainer config={chartConfig} className={`h-[100cqh] min-h-[120px] !aspect-auto`}>
                    <AreaChart accessibilityLayer data={chartData} margin={{ top: 22, right: 30, bottom: 0, left: -30 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <YAxis
                    type="number"
                    domain={[0, "dataMax"]}
                    tickFormatter={(value) => `${value}`}
                    
                    />
                    <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                    />

                    <defs>
                    <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                        <stop
                        offset="1%"
                        stopColor="#3C1072"
                        fillOpacity={100}
                        stopOpacity={100}
                        />
                        <stop
                        offset="95%"
                        stopColor="#6574FF"
                        stopOpacity={0.01}
                        />
                    </linearGradient>
                    </defs>
         

                        <Area
                        dataKey="desktop"
                        type="linear"
                        fill="url(#fillDesktop)"
                        fillOpacity={0.4}
                        strokeOpacity={0}
                        stroke=""
                        stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </div>
        </FullSizeCard>
    );
}