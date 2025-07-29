
import NumberFlow, { NumberFlowGroup } from '@number-flow/react'
import { Progress } from "../ui/progress";
import { FullSizeCard } from "../fullSize-Card";
import { type LucideIcon } from "lucide-react";

export const description = "A line chart with a label"
export type TrafficSource = {
  source: string;
  totalVisits: number;
  referenceVisits: number;
}

  const fetchRandomVisits = () => {
    return Math.floor(Math.random() * 1500) + 100;
  }

  const fetchRandomPercentage = () => {
    const random = (Math.floor(Math.random() * 100.55))
    return (random - 40)/1000
  }
  const trafficSources: TrafficSource[] = [
    { source: "Directo", totalVisits: fetchRandomVisits(), referenceVisits: fetchRandomPercentage() },
    { source: "Orgánico", totalVisits: fetchRandomVisits(), referenceVisits: fetchRandomPercentage() },
    { source: "Referido", totalVisits: fetchRandomVisits(), referenceVisits: fetchRandomPercentage() },
    { source: "Social", totalVisits: fetchRandomVisits(), referenceVisits: fetchRandomPercentage() },
    { source: "Email", totalVisits: fetchRandomVisits(), referenceVisits: fetchRandomPercentage() },
  ];
type Props = {
  className?: string;
  title: string;
  description?: string;
  Icon?: LucideIcon;
  identifier?: string;
  fullScreenButton?: boolean;
}
export function CasinoBetsCard({ title, description, Icon}: Props) {
  const totalAllVisits = trafficSources.reduce((sum, src) => sum + src.totalVisits, 0);

  return (
    <FullSizeCard className='py-4 h-full ' Icon={Icon} fullScreenButton={false} title={title} description={description}>
      <div className="flex gap-4 justify-center items-center w-full h-full">
            {trafficSources.map((source) => {
              const impactPercentage = (source.totalVisits / totalAllVisits) * 100;
              return (
                <div key={source.source} className="flex flex-col gap-2 w-full">
                    <span className="text-base font-medium">{source.source}</span>

                    <div className="w-full flex items-start gap-2">
                      <Progress
                        className="h-2"
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
                        </div>
                      </NumberFlowGroup>
                    </div>

                </div>)
          })}
      </div>
    </FullSizeCard> 
  )
}
