
import { cn } from "@/lib/utils";
import NumberFlow, { NumberFlowGroup } from '@number-flow/react'
import { Progress } from "../ui/progress";
import { GeneralCard } from "../general-card";
import { getTrafficSourcesAndEvents } from "@/queryOptions/queryOptions-marketing";
import { useQuery } from "@tanstack/react-query";
import CardLoading from "../loading-card";
import { GeneralErrorContent } from "../general-error-content";
import { useContextQuery } from "@/contexts/query-context";
import { GeneralEmptyContent } from "../general-empty-content";

export type TrafficSource = {
  source: string;
  totalVisits: number;
  referenceVisits: number;
}
type ChartLineLabelProps = {
  className?: string;
}
export function TrafficSources({ className }: ChartLineLabelProps) {
    const { queryString } = useContextQuery();

  const trafficSources = useQuery(
      getTrafficSourcesAndEvents({queryString}),
  );


      if (trafficSources.isPending || trafficSources.isFetching) {
          return <CardLoading className="w-full h-full animate-pulse col-span-1 md:col-span-2 min-h-fit" description={true} title={true} children={<div className='min-h-[125px] h-full bg-foreground/10 rounded-md animate-pulse' />} />
      }

      if (!trafficSources.data || trafficSources.data.length === 0) {
          return (
            <GeneralCard hasFilter={true} isLoading={trafficSources.isPending} identifier="chart2" title="Fuentes de tráfico" classNameContainer="col-span-1 md:col-span-2 min-h-fit" description="De dónde vienen tus visitantes" className={cn("w-full h-fit md:h-full md:pb-0 border-0 col-span-1", className)}>
              <GeneralEmptyContent />
            </GeneralCard>      
        )
      }
  
      if (trafficSources.error) {
          return (    
          <GeneralCard hasFilter={true}  identifier="chart2" title="Fuentes de tráfico" classNameContainer="col-span-1 md:col-span-2 min-h-fit" description="De dónde vienen tus visitantes" className={cn("w-full h-fit md:h-full md:pb-0 border-0 col-span-1", className)}>
              <GeneralErrorContent />
          </GeneralCard>
          )
      }

  return (
    <GeneralCard hasFilter={true} isLoading={trafficSources.isPending} identifier="chart2" title="Fuentes de tráfico" classNameContainer="col-span-1 md:col-span-2 min-h-fit" description="De dónde vienen tus visitantes" className={cn("w-full h-fit md:h-full md:pb-0 border-0 col-span-1", className)}>
        <div className="flex flex-col justify-betweenh-full">
            {trafficSources.data?.map((source, index) => {
              return (
                <div key={index} className="flex flex-col">
                    
                    <div className="flex gap-1 items-center">
                      <span className="text-base font-medium">{source.medium}</span>
                      <span>-</span>
                      <span className="text-xs text-muted-foreground">{source.eventName}</span>
                    </div>

                    <div className="w-full flex items-start gap-2">
                      <Progress
                        className="h-3"
                        value={source.trafficPercentage}
                      />

                      <NumberFlowGroup>
                        <div
                          style={{ ['--number-flow-char-height' as string]: '0.85em'}}
                          className="flex flex-col items-center font-semibold -mt-1"
                        >
                          <NumberFlow
                            value={source.activeUsers}
                            locales="en-US"
                            format={{ style: 'decimal' }}
                            className="text-sm text- font-bold"
                          />
                          <NumberFlow
                            value={source.trafficPercentage/100}
                            locales="en-US"
                            format={{ style: 'percent', maximumFractionDigits: 2 }}
                            className={cn(
                              'text-xs transition-colors duration-300',
                              source.trafficPercentage < 0 ? 'text-red-500' : 'text-emerald-500'
                            )}
                          />
                        </div>
                      </NumberFlowGroup>
                    </div>

                </div>)
          })}
          </div>
    </GeneralCard>
  )
}
