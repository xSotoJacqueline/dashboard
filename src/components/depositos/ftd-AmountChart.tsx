import { FullSizeCard } from "../fullSize-Card";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "../ui/chart";
import { useIsActiveStore } from "@/lib/active-full-container";

export function FTDAmountChart() {
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
        color: "var(--green-foliatti)",
        },
        mobile: {
        label: "Mobile",
        color: "var(--green-foliatti)",
        },
    } satisfies ChartConfig

    return (
        <FullSizeCard identifier="chart2" title="Monto FTD’s por día" description="Monto promedio de los primeros depósitos">
            <ChartContainer config={chartConfig} className={`${activeGame ? "h-[80cqh]" : "h-[150px]"}  !aspect-auto`}>
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
                    <Bar dataKey="desktop" fill="var(--color-green-foliatti)" radius={8} />
                </BarChart>
            </ChartContainer>
        </FullSizeCard>
    );
}