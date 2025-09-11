import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { FullSizeCard } from "../fullSize-Card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { getDailyAcquisition } from "@/queryOptions/queryOptions-metricas";
import { useQuery } from "@tanstack/react-query";
import { useContextQuery } from "@/contexts/query-context";
import CardLoading from "../loading-card";
import { GeneralErrorContent } from "../general-error-content";
import { GeneralEmptyContent } from "../general-empty-content";
import { format, parse, parseISO } from "date-fns";
import { es } from "date-fns/locale";

const chartConfig = {
    trafficData: {
    label: "date",
    color: "var(--green-foliatti)",
    },
} satisfies ChartConfig

export function ChartLineAcquisition() {
    const { queryString } = useContextQuery();
    const dailyAcquisition = useQuery(
        getDailyAcquisition({queryString}),
    );


        if (dailyAcquisition.isPending || dailyAcquisition.isFetching) {
            return <CardLoading className="w-full h-full animate-pulse" title={true} children={<div className='min-h-[125px] h-full bg-foreground/10 rounded-md animate-pulse' />} />
    
        }
    
        if (dailyAcquisition.error) {
            return (    
            <FullSizeCard hasFilter={true} identifier='chart1' cardContentClassName="min-h-[120px]" title="Tasa de Adquisición">
                <GeneralErrorContent refetch={dailyAcquisition.refetch} />
            </FullSizeCard>
            )
        }
    
        if (!dailyAcquisition.data || dailyAcquisition.data.length === 0) {
            return (    
            <FullSizeCard hasFilter={true} identifier='chart1' cardContentClassName="min-h-[120px]" title="Tasa de Adquisición">
                <GeneralEmptyContent />
            </FullSizeCard>
            )
        }
  return (
        <FullSizeCard hasFilter={true} identifier='chart1' title="Tasa de Adquisición" description="Número total de bonos utilizados por cliente">
            <div style={{containerType: "size"}} className="w-full h-full min-h-[120px]">
                <ChartContainer config={chartConfig} className={`h-[100cqh] min-h-[120px] !aspect-auto`}>
                  <LineChart data={dailyAcquisition.data} margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
                    <CartesianGrid vertical={false} />
                    <YAxis
                    type="number"
                    domain={[0, "dataMax"]}
                    tickFormatter={(value) => `${value.toLocaleString()}%`}
                    />
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
                                    parsedDate = parse(value, 'dd/MM/yy', new Date());
                                } else {
                                    parsedDate = parseISO(value);
                                }
                                // Check if the parsed date is valid
                                if (isNaN(parsedDate.getTime())) {
                                    return value;
                                }
                                return format(parsedDate, 'd MMM yy', {locale: es});
                            } catch (error) {
                                return value?.toString() || '';
                            }
                        }}                   
                         />
                    <ChartTooltip
                        content={<ChartTooltipContent hideLabel={true} />}
                        formatter={(value, name, props) => {
                            const date = props.payload.date;
                            return (
                                <span id={name.toString()} className="relative pl-2 flex flex-col gap-1">
                                <div  className="absolute inset-0 left-0 w-1 rounded-full bg-primary-foliatti" />
                                {date && <span className="font-semibold">{format(parseISO(date), 'd MMM yyyy', {locale: es})}</span>}
                                {value.toLocaleString()}%<br />
                                </span>
                            )
                        }}
                    />
                    <Line
                    dataKey="acquisitionRate"
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

                    </Line>
                  </LineChart>
                </ChartContainer>
            </div>
        </FullSizeCard>
  )
}
