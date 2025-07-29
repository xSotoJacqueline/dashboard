
import NumberFlow, { NumberFlowGroup } from '@number-flow/react'
import { Progress } from "../ui/progress";
import { type LucideIcon } from "lucide-react";
import { GeneralCard } from '../general-card';


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
export function EarningsProgressCard({ title, description, Icon}: Props) {

  const totalAllVisits = trafficSources.reduce((sum, src) => sum + src.totalVisits, 0);

  return (
    <GeneralCard classNameContainer="overflow-visible" className='h-full' Icon={Icon} title={title} description={description}>
      <div className='h-full w-full flex flex-col gap-4'>
        {trafficSources.map((source) => {
          const impactPercentage = (source.totalVisits / totalAllVisits) * 100;
            return (
              <div key={source.source} className="w-full flex h-fit  items-center justify-between gap-6">
                  <span className="text-base min-w-28 ">{source.source}</span>
                  <Progress
                  className="h-2 mt-1 w-full"
                  value={impactPercentage}
                  />
                  <NumberFlowGroup>
                  <div
                      style={{ ['--number-flow-char-height' as string]: '0.85em'}}
                      className="flex flex-col items-end min-w-20 font-semibold"
                  >
                      <NumberFlow
                      value={source.totalVisits}
                      locales="en-US"
                      format={{ style: 'currency', currency: 'USD' }}
                      className="text-sm text- font-bold"
                      />
                  </div>
                  </NumberFlowGroup>
              </div>
            )
        })}
      </div>
    </GeneralCard> 
  )
}
