import { FullSizeCard } from "../fullSize-Card";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "../ui/chart";
import { GiftIcon } from "lucide-react";

export function BonosPerClientChart() {
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
        <FullSizeCard identifier="chart2" cardContentClassName="min-h-[120px]" title="Bonos por cliente" description="Número total de bonos utilizados por cliente" Icon={GiftIcon}>
            <div style={{containerType: "size"}} className="w-full h-full min-h-[120px]">
                <ChartContainer config={chartConfig} className={`h-[100cqh] min-h-[120px] !aspect-auto`}>
                    <LineChart data={chartData} margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                    />
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
                        position="top"
                        offset={12}
                        className="fill-foreground"
                        fontSize={12}
                    />
                    </Line>
                    </LineChart>
                </ChartContainer>
            </div>
        </FullSizeCard>
    );
}