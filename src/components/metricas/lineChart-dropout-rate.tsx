import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { FullSizeCard } from "../fullSize-Card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { getDailyDropoutRate } from "@/queryOptions/queryOptions-metricas";
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

export function ChartLineDropoutRate() {
    const { queryString } = useContextQuery();
    const dropoutRate = useQuery(
        getDailyDropoutRate({queryString}),
    );
    const title = "Tasa de Deserción"

        if (dropoutRate.isPending || dropoutRate.isFetching) {
            return <CardLoading className="w-full h-full animate-pulse" title={true} children={<div className='min-h-[125px] h-full bg-foreground/10 rounded-md animate-pulse' />} />
    
        }
    
        if (dropoutRate.error) {
            return (    
            <FullSizeCard hasFilter={true} identifier='chart2' cardContentClassName="min-h-[120px]" title={title}>
                <GeneralErrorContent refetch={dropoutRate.refetch} />
            </FullSizeCard>
            )
        }

        if (!dropoutRate.data.dailyRates || dropoutRate.data.dailyRates.length === 0) {
            return (
            <FullSizeCard hasFilter={true} identifier='chart2' cardContentClassName="min-h-[120px]" title={title}>
                <GeneralEmptyContent />
            </FullSizeCard>
            )
        }
  return (
        <FullSizeCard hasFilter={true} identifier='chart2' title={title}>
            <div style={{containerType: "size"}} className="w-full h-full min-h-[120px]">
                <ChartContainer config={chartConfig} className={`h-[100cqh] min-h-[120px] !aspect-auto`}>
                  <LineChart data={dropoutRate.data.dailyRates} margin={{ top: 20, right: 10, bottom: 20, left: -20 }}>
                    <CartesianGrid vertical={false} />
                    <YAxis
                    type="number"
                    domain={[0, "dataMax"]}
                    tickFormatter={(value) => `${value.toLocaleString()}`}
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
                                {value.toLocaleString()}<br />
                                </span>
                            )
                        }}
                    />
                    <Line
                    dataKey="dropoutUsers"
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
