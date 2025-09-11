import { FullSizeCard } from "../fullSize-Card";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "../ui/chart";
import { useQuery } from "@tanstack/react-query";
import CardLoading from "../loading-card";
import { GeneralEmptyContent } from "../general-empty-content";
import { GeneralErrorContent } from "../general-error-content";
import { getCountAllUsersByBonus } from "@/queryOptions/queryOptions-bonos";

export function BonusPerClientChart() {

    const allUsersByBonus = useQuery(
      getCountAllUsersByBonus()
    );

    const hasFilters = false;

    if (allUsersByBonus.isPending || allUsersByBonus.isFetching) {
        return <CardLoading className="w-full h-full animate-pulse" title={true} children={<div className='min-h-[125px] h-full bg-foreground/10 rounded-md animate-pulse' />} />
    }

    if (allUsersByBonus.error) {
        return (    
        <FullSizeCard hasFilter={hasFilters} identifier="chart2" cardContentClassName="min-h-[120px]" title="Bonos por cliente" description="Número total de bonos utilizados por cliente">
            <GeneralErrorContent refetch={allUsersByBonus.refetch} />
        </FullSizeCard>
        )
    }

    if (!allUsersByBonus.data || allUsersByBonus.data.length === 0) {
        return (    
        <FullSizeCard hasFilter={hasFilters} identifier="chart2" cardContentClassName="min-h-[120px]" title="Bonos por cliente" description="Número total de bonos utilizados por cliente">
            <GeneralEmptyContent />
        </FullSizeCard>
        )
    }

    const chartConfig = {
        ftdMount: {
        label: "Código de bono",
        color: "var(--green-foliatti)",
        },
    } satisfies ChartConfig

    return (
        <FullSizeCard hasFilter={hasFilters} identifier="chart2" cardContentClassName="min-h-[120px]" title="Bonos por cliente" description="Número total de bonos utilizados por cliente">
            <div style={{containerType: "size"}} className="w-full h-full min-h-[120px]">
                <ChartContainer config={chartConfig} className={`h-[100cqh] min-h-[120px] !aspect-auto`}>
                    <BarChart
                    
                    accessibilityLayer
                    data={allUsersByBonus.data}
                    margin={{
                    left: 0
                    }}
                >
                    <CartesianGrid vertical={false} />
                        <XAxis
                        dataKey="bonus_code"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
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
                                className="w-fit min-w-[150px]"
                                nameKey="total_users"
                                label={"Usuarios por"}
                        
                                />
                            }
                        />
                    <Bar isAnimationActive={false} dataKey="total_users" fill="var(--color-primary-foliatti)" radius={8} />
                </BarChart>
                </ChartContainer>
            </div>
        </FullSizeCard>
    );
}