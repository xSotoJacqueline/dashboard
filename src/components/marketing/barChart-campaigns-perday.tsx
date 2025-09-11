import { FullSizeCard } from "../fullSize-Card";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "../ui/chart";
import { useQuery } from "@tanstack/react-query";
import CardLoading from "../loading-card";
import { GeneralEmptyContent } from "../general-empty-content";
import { GeneralErrorContent } from "../general-error-content";
import { format, parseISO, parse } from "date-fns";
import { es } from "date-fns/locale";
import { getActiveUsersByDay } from "@/queryOptions/queryOptions-marketing";
import { useContextQuery } from "@/contexts/query-context";

export function BarChartPerDayMarketing() {
    const { queryString } = useContextQuery();
    const { data: trafficData, error, isPending, isFetching, refetch } = useQuery(
        getActiveUsersByDay({queryString}),
    );
    
    const hasFilters = false;

    if (isPending || isFetching) {
        return <CardLoading className="w-full h-full animate-pulse" title={true} children={<div className='min-h-[125px] h-full bg-foreground/10 rounded-md animate-pulse' />} />

    }

    if (error) {
        return (    
        <FullSizeCard identifier="chart1" cardContentClassName="min-h-[120px]" title="Jugadores activos diarios" hasFilter={hasFilters}>
            <GeneralErrorContent refetch={refetch} />
        </FullSizeCard>
        )
    }

    if (!trafficData || trafficData.length === 0) {
        return (    
        <FullSizeCard identifier="chart1" cardContentClassName="min-h-[120px]" title="Jugadores activos diarios" hasFilter={hasFilters}>
            <GeneralEmptyContent />
        </FullSizeCard>
        )
    }

    const chartConfig = {
        trafficData: {
        label: "date",
        color: "var(--green-foliatti)",
        },
    } satisfies ChartConfig

    return (
        <FullSizeCard identifier="chart1" cardContentClassName="min-h-[120px]" title="Jugadores activos diarios" hasFilter={hasFilters}>
            <div style={{containerType: "size"}} className="w-full h-full min-h-[120px]">
                <ChartContainer config={chartConfig} className={`h-[100cqh] min-h-[120px] !aspect-auto`}>
                    <BarChart
                    accessibilityLayer
                    data={trafficData}
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
                            try {
                                // Check if value is a valid date string
                                if (!value || typeof value !== 'string') {
                                    return value?.toString() || '';
                                }
                                let parsedDate;
                                if (value.includes('/')) {
                                    parsedDate = parse(value, 'dd/MM/yyyy', new Date());
                                } else {
                                    parsedDate = parseISO(value);
                                }
                                // Check if the parsed date is valid
                                if (isNaN(parsedDate.getTime())) {
                                    return value;
                                }
                                return format(parsedDate, 'd MMM yyyy', {locale: es});
                            } catch (error) {
                                return value?.toString() || '';
                            }
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
                                nameKey="activeUsers"
                                labelFormatter={(value) => {
                                try {
                                    // Check if value is a valid date string
                                    if (!value || typeof value !== 'string') {
                                        return value?.toString() || '';
                                    }
                                    
                                    // Try parsing DD/MM/YYYY format first
                                    let parsedDate;
                                    if (value.includes('/')) {
                                        parsedDate = parse(value, 'dd/MM/yyyy', new Date());
                                    } else {
                                        parsedDate = parseISO(value);
                                    }

                                    if (isNaN(parsedDate.getTime())) {
                                        return value;
                                    }
                                    return format(parsedDate, 'd MMM yyyy', {locale: es});
                                } catch (error) {
                                    console.warn('Date formatting error:', error, 'for value:', value);
                                    return value?.toString() || '';
                                }
                                }}
                            />
                        }
                        />
                    <Bar isAnimationActive={false} dataKey="activeUsers" fill="var(--color-primary-foliatti)" radius={8} />
                </BarChart>
                </ChartContainer>
            </div>
        </FullSizeCard>
    );
}