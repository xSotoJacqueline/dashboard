import { FullSizeCard } from "../fullSize-Card";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "../ui/chart";
import { useIsActiveStore } from "@/lib/active-full-container";
import { DollarSignIcon } from "lucide-react";

export function EarningsClientBonosChart() {
    const { activeGame } = useIsActiveStore();
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
        color: "var(--chart-1)",
        },
        mobile: {
        label: "Mobile",
        color: "var(--chart-2)",
        },
    } satisfies ChartConfig

    return (
        <FullSizeCard identifier="chart3" title="Ganancias generadas por cliente con bonos" description="Número total de clientes que han ganado utilizando bonos" Icon={DollarSignIcon}>
            <ChartContainer config={chartConfig} className={`${activeGame ? "h-[100cqh]" : "h-[150px]"}  !aspect-auto`}>
                {/* <ResponsiveContainer width="100%" height="100%"> */}
                    <LineChart data={chartData} margin={{ top: 22, right: 30, bottom: 0, left: -30 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                    />
                    {/* <YAxis
                    type="number"
                    domain={[0, "dataMax"]}
                    tickFormatter={(value) => `${value}`}
                    
                    /> */}
                    <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                    />
                    <Line
                    dataKey="desktop"
                    type="natural"
                    stroke="var(--color-lunes)"
                    strokeWidth={2}
                    dot={{
                        stroke: "var(--color-green-foliatti)",
                    }}
                    activeDot={{
                        r: 6,
                    }}
                    >
                    <LabelList
                        position="bottom"
                        offset={12}
                        className="fill-foreground"
                        fontSize={12}
                    />
                    </Line>
                    </LineChart>
                {/* </ResponsiveContainer> */}
            </ChartContainer>
        </FullSizeCard>
    );
}