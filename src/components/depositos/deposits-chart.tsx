import { FullSizeCard } from "../fullSize-Card";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "../ui/chart";
import { getTotalDepositsByStatusAndDayQueryOptions, type totalDepositsStatusDay } from "@/queryOptions/queryOptions";
import { AreaSeries, createChart, ColorType, type IChartApi, type ISeriesApi } from 'lightweight-charts';  
import React, { useEffect, useRef } from 'react';
import { useQuery } from "@tanstack/react-query";
import CardLoading from "../loading-card";
import { GeneralEmptyContent } from "../general-empty-content";
import { GeneralErrorContent } from "../general-error-content";

interface ChartColors {  
    backgroundColor?: string;  
    lineColor?: string;  
    textColor?: string;  
    areaTopColor?: string;  
    areaBottomColor?: string;  
}  
  
interface ChartComponentProps {  
    data: Array<{ time: string; value: number }>;  
    colors?: ChartColors;  
}  
  
export const ChartComponent: React.FC<ChartComponentProps> = (props) => {  
    const {  
        data,  
        colors: {  
            backgroundColor = 'black',  
            lineColor = '#2962FF',  
            textColor = 'white',  
            areaTopColor = '#2962FF',  
            areaBottomColor = 'rgba(41, 98, 255, 0.28)',  
        } = {},  
    } = props;  
  
    const chartContainerRef = useRef<HTMLDivElement>(null);  
  
    useEffect(  
        () => {  
            if (!chartContainerRef.current) return;  
  
            const handleResize = () => {  
                if (chartContainerRef.current) {  
                    chart.applyOptions({ width: chartContainerRef.current.clientWidth });  
                }  
            };  
  
            const chart: IChartApi = createChart(chartContainerRef.current, {  
                layout: {  
                    background: { type: ColorType.Solid, color: backgroundColor },  
                    textColor,  
                },  
                width: chartContainerRef.current.clientWidth,  
                height: 300,  
            });  
            chart.timeScale().fitContent();  
  
            const newSeries: ISeriesApi<'Area'> = chart.addSeries(AreaSeries, {   
                lineColor,   
                topColor: areaTopColor,   
                bottomColor: areaBottomColor   
            });  
            newSeries.setData(data);  
  
            window.addEventListener('resize', handleResize);  
  
            return () => {  
                window.removeEventListener('resize', handleResize);  
                chart.remove();  
            };  
        },  
        [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]  
    );  
  
    return (  
        <div  
            ref={chartContainerRef}  
        />  
    );  
};

export function DepositsChart() {

    const { data: allDeposits, error, isPending, isFetching, refetch } = useQuery(
        getTotalDepositsByStatusAndDayQueryOptions(),
    );

    if (isPending || isFetching) {
        return <CardLoading className="w-full h-full animate-pulse" title={true} description={true} children={<div className='min-h-[125px] h-full bg-foreground/10 rounded-md animate-pulse' />} />
    }

    if (error) {
        return (    
            <FullSizeCard identifier="chart1" cardContentClassName="min-h-[120px]" title="Comportamiento de depósitos en el tiempo" description="Número total de bonos utilizados por cliente">
                <GeneralErrorContent refetch={refetch} />
            </FullSizeCard>
        )
    }

    if (!allDeposits) {
        return (    
        <FullSizeCard identifier="chart1" cardContentClassName="min-h-[120px]" title="Comportamiento de depósitos en el tiempo" description="Número total de bonos utilizados por cliente">
            <GeneralEmptyContent />
        </FullSizeCard>
        )
    }


    const chartGetData = ({allDeposits}: {allDeposits: totalDepositsStatusDay}) => {
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
    }

    const chartData = chartGetData({allDeposits});

    const chartConfig = {
        paid: {
            label: "Paid",
            color: "var(--color-green-foliatti)",
        },
        failed: {
            label: "Failed",
            color: "var(--martes)",
        },
        cancelled: {
            label: "Cancelled",
            color: "var(#FFA500)",
        },
    } satisfies ChartConfig

    return (
        <FullSizeCard identifier="chart1" cardContentClassName="min-h-[120px]" title="Comportamiento de depósitos en el tiempo" description="Número total de bonos utilizados por cliente">
            <div style={{containerType: "size"}} className="w-full h-full min-h-[120px]">
                <ChartContainer config={chartConfig} className={`h-[100cqh] min-h-[120px] !aspect-auto`}>
                    <LineChart data={chartData} margin={{ top: 20, right: 30, bottom: 0, left: 20 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                    dataKey="time"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => {
                        const date = new Date(value)
                        return date.toLocaleDateString("es-MX", {
                        day: "numeric",
                        month: "short",
                        })
                    }}
                    />

                    <YAxis
                    type="number"
                    minTickGap={10}
                    />
                    <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line"  />}
                    />
                        <Line
                            dataKey="paid"
                            type="natural"
                            stroke="var(--primary)"
                            strokeWidth={2}
                            dot={{
                                stroke: "var(--color-green-foliatti)",
                            }}
                            activeDot={{ r: 6 }}
                        />
                        <Line
                            dataKey="failed"
                            type="natural"
                            stroke="#FF0000"
                            strokeWidth={2}
                            dot={{ stroke: "#FF0000" }}
                            activeDot={{ r: 6 }}
                        />
                        <Line
                            dataKey="cancelled"
                            type="natural"
                            stroke="#FFA500"
                            strokeWidth={2}
                            dot={{ stroke: "#FFA500" }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ChartContainer>     
                                {/* <ChartComponent data={deposits}/>   */}

            </div>
        </FullSizeCard>
    );
}