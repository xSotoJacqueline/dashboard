import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card"
import { cn } from "@/lib/utils";
import NumberFlow, { NumberFlowGroup } from '@number-flow/react'
import { Progress } from "../ui/progress";

export const description = "A line chart with a label"
export type TrafficSource = {
  source: string;
  totalVisits: number;
  referenceVisits: number;
}
type ChartLineLabelProps = {
  trafficSources: TrafficSource[];
  className?: string;
}

export function TrafficSources({ className, trafficSources }: ChartLineLabelProps) {
    const totalAllVisits = trafficSources.reduce((sum, src) => sum + src.totalVisits, 0);
    console.log("Total de visitas:", totalAllVisits);

  return (
    <Card className={cn(`w-full h-fit md:h-full md:pb-0 border-0 col-span-1`, className)}>
        <CardHeader>
            <CardTitle className="text-xl font-semibold">Fuentes de Tráfico</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              De dónde vienen tus visitantes
            </CardDescription>
        </CardHeader>
        <CardContent className="relative sm:pt-0 h-full">
          <div className="flex flex-col justify-betweenh-full">
            {trafficSources.map((source) => {
                const impactPercentage = (source.totalVisits / totalAllVisits) * 100;
                console.log(`Impacto de ${source.source}: ${impactPercentage.toFixed(2)}%`);

              return (
                <div key={source.source} className="flex flex-col">
                    <span className="text-base font-medium">{source.source}</span>

                    <div className="w-full flex items-start gap-2">
                      <Progress
                        className="h-3"
                        value={impactPercentage}
                      />

                      <NumberFlowGroup>
                        <div
                          style={{ ['--number-flow-char-height' as string]: '0.85em'}}
                          className="flex flex-col items-center font-semibold -mt-1"
                        >
                          <NumberFlow
                            value={source.totalVisits}
                            locales="en-US"
                            format={{ style: 'decimal' }}
                            className="text-sm text- font-bold"
                          />
                          <NumberFlow
                            value={source.referenceVisits}
                            locales="en-US"
                            format={{ style: 'percent', maximumFractionDigits: 2, signDisplay: 'always' }}
                            className={cn(
                              'text-xs transition-colors duration-300',
                              source.referenceVisits < 0 ? 'text-red-500' : 'text-emerald-500'
                            )}
                          />
                        </div>
                      </NumberFlowGroup>
                    </div>

                </div>)
          })}
          </div>
        </CardContent>

    </Card>
  )
}
