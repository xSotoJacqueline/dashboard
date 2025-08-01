import { FullSizeCard } from "../fullSize-Card";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "../ui/chart";

export function FirstFTDChart() {
    const chartData = [
        { date: "07/01/2025 00:51", desktop: 186, mobile: 80 },
        { date: "07/02/2025 00:51", desktop: 305, mobile: 200 },
        { date: "07/03/2025 00:51", desktop: 237, mobile: 120 },
        { date: "07/04/2025 00:51", desktop: 73, mobile: 190 },
        { date: "07/05/2025 00:51", desktop: 209, mobile: 130 },
        { date: "07/06/2025 00:51", desktop: 214, mobile: 140 },
    ]

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
        <FullSizeCard identifier="chart2" cardContentClassName="min-h-[120px]" title="FTD’s diarios" description="(Primeros depósitos)">
            <div style={{containerType: "size"}} className="w-full h-full min-h-[120px]">
                <ChartContainer config={chartConfig} className={`h-[100cqh] min-h-[120px] !aspect-auto`}>
                    <BarChart
        accessibilityLayer
        data={chartData}
        margin={{
        left: -30
        }}
    >
        <CartesianGrid vertical={false} />
        <XAxis
        dataKey="date"
        tickLine={false}
        axisLine={false}
        tickMargin={8}
        minTickGap={32}
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
            nameKey="views"
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
        <Bar dataKey="desktop" fill="var(--color-primary-foliatti)" radius={8} />
                    </BarChart>
                </ChartContainer>
            </div>
        </FullSizeCard>
    );
}