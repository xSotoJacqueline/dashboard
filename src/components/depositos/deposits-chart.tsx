import { FullSizeCard } from "../fullSize-Card";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "../ui/chart";
import { getTotalDepositsByStatusAndDayQueryOptions, type totalDepositsStatusDay } from "@/queryOptions/queryOptions";
import { useQuery } from "@tanstack/react-query";
import CardLoading from "../loading-card";
import { GeneralEmptyContent } from "../general-empty-content";
import { GeneralErrorContent } from "../general-error-content";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { useMemo, useCallback } from "react"; // Agregado
import { useContextQuery } from "@/contexts/query-context";

export function DepositsChart() {
    const { queryString } = useContextQuery();
    const { data: allDeposits, error, isPending, refetch } = useQuery(
        getTotalDepositsByStatusAndDayQueryOptions({queryString}),
    );
    const hasFilters = true;
    // Memoizar la función de procesamiento de datos
    const chartGetData = useCallback(({allDeposits}: {allDeposits: totalDepositsStatusDay}) => {
        const dateMap = new Map();

        allDeposits.Paid.forEach(item => {
            if (!dateMap.has(item.date)) {
                dateMap.set(item.date, { time: item.date, paid: 0, failed: 0, cancelled: 0 });
            }
            dateMap.get(item.date).paid = item.dailyTotal;
        });
        
        // Process failed deposits
        allDeposits.Failed.forEach(item => {
            if (!dateMap.has(item.date)) {
                dateMap.set(item.date, { time: item.date, paid: 0, failed: 0, cancelled: 0 });
            }
            dateMap.get(item.date).failed = item.dailyTotal;
        });
        
        // Process cancelled deposits
        allDeposits.Cancelled.forEach(item => {
            if (!dateMap.has(item.date)) {
                dateMap.set(item.date, { time: item.date, paid: 0, failed: 0, cancelled: 0 });
            }
            dateMap.get(item.date).cancelled = item.dailyTotal;
        });
        
        return Array.from(dateMap.values()).sort((a, b) => 
            new Date(a.time).getTime() - new Date(b.time).getTime()
        );
    }, []);

    // Memoizar los datos del gráfico para evitar recálculos innecesarios
    const chartData = useMemo(() => {
        if (!allDeposits) return [];
        return chartGetData({allDeposits});
    }, [allDeposits, chartGetData]);

    // Memoizar la configuración del gráfico
    const chartConfig = useMemo(() => ({
        paid: {
            label: "Pagados",
            color: "var(--color-green-foliatti)",
        },
        failed: {
            label: "Fallidos",
            color: "var(--martes)",
        },
        cancelled: {
            label: "Cancelados",
            color: "#FFA500",
        },
    } satisfies ChartConfig), []);

    // Memoizar los formateadores de fecha para evitar recrearlos
    const tickFormatter = useCallback((value: string) => {
        return format(parseISO(value), 'd MMM yyyy', {locale: es});
    }, []);

    const tooltipLabelFormatter = useCallback((value: string) => {
        return format(parseISO(value), 'd MMM yyyy', {locale: es});
    }, []);

    // Memoizar las líneas del gráfico
    const chartLines = useMemo(() => [
        <Line
            key="paid"
            dataKey="paid"
            type="natural"
            stroke="var(--primary)"
            strokeWidth={2}
            dot={{
                stroke: "var(--color-green-foliatti)",
            }}
            activeDot={{ r: 6 }}
        />,
        <Line
            key="failed"
            dataKey="failed"
            type="natural"
            stroke="#FF0000"
            strokeWidth={2}
            dot={{ stroke: "#FF0000" }}
            activeDot={{ r: 6 }}
        />,
        <Line
            key="cancelled"
            dataKey="cancelled"
            type="natural"
            stroke="#FFA500"
            strokeWidth={2}
            dot={{ stroke: "#FFA500" }}
            activeDot={{ r: 6 }}
        />
    ], []);

    if (isPending) {
        return <CardLoading className="w-full h-full animate-pulse" title={true} description={true} children={<div className='min-h-[125px] h-full bg-foreground/10 rounded-md animate-pulse' />} />
    }

    if (error) {
        return (    
            <FullSizeCard hasFilter={hasFilters} identifier="chart1" cardContentClassName="min-h-[120px]" title="Comportamiento de depósitos en el tiempo" description="Número total de depósitos por estado">
                <GeneralErrorContent refetch={refetch} />
            </FullSizeCard>
        )
    }

    if (!allDeposits || (allDeposits.Paid.length === 0 && allDeposits.Failed.length === 0 && allDeposits.Cancelled.length === 0)) {
        return (    
            <FullSizeCard hasFilter={hasFilters} identifier="chart1" cardContentClassName="min-h-[120px]" title="Comportamiento de depósitos en el tiempo" description="Número total de depósitos por estado">
                <GeneralEmptyContent />
            </FullSizeCard>
        )
    }

    return (
        <FullSizeCard hasFilter={hasFilters} identifier="chart1" cardContentClassName="min-h-[120px]" title="Comportamiento de depósitos en el tiempo" description="Número total de depósitos por estado">
            <div style={{containerType: "size"}} className="w-full h-full min-h-[120px]">
                <ChartContainer config={chartConfig} className={`h-[100cqh] min-h-[120px] !aspect-auto`}>
                    <LineChart data={chartData} margin={{ top: 20, right: 30, bottom: 0, left: 20 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="time"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={tickFormatter}
                        />
                        <YAxis
                            type="number"
                            minTickGap={10}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    indicator="line"
                                    nameKey="total"
                                    labelFormatter={tooltipLabelFormatter}
                                />
                            }
                        />
                        {chartLines}
                    </LineChart>
                </ChartContainer>
            </div>
        </FullSizeCard>
    );
}