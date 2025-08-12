import { FullSizeCard } from "../fullSize-Card";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "../ui/chart";
import { useQuery } from "@tanstack/react-query";
import { FTDMountByDayQueryOptions } from "@/queryOptions/queryOptions";
import CardLoading from "../loading-card";
import { GeneralEmptyContent } from "../general-empty-content";
import { GeneralErrorContent } from "../general-error-content";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

export function FTDAmountChart({queryString}: {queryString?: string}) {
    const { data: ftdMount, isPending, isFetching, error, refetch } = useQuery(FTDMountByDayQueryOptions({queryString}));

        if (isPending || isFetching) {
            return <CardLoading className="w-full h-full animate-pulse" title={true} children={<div className='min-h-[125px] h-full bg-foreground/10 rounded-md animate-pulse' />} />
    
        }
    
        if (error) {
           return (    
            <FullSizeCard identifier="chart3" cardContentClassName="min-h-[120px]" title="Monto FTD’s por día" description="Monto promedio de los primeros depósitos">
                <GeneralErrorContent refetch={refetch} />
            </FullSizeCard>
            )
        }
    

    if (!ftdMount || ftdMount.length === 0) {
        return (    
        <FullSizeCard identifier="chart3" cardContentClassName="min-h-[120px]" title="Monto FTD’s por día" description="Monto promedio de los primeros depósitos">
            <GeneralEmptyContent />
        </FullSizeCard>
        )
    }


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
                             return format(parseISO(value), 'd MMM yyyy', {locale: es})   
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
                                return format(parseISO(value), 'd MMM yyyy', {locale: es}) 
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