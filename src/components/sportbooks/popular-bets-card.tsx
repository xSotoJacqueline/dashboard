
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
  const trafficSources: TrafficSource = {
    source: "Directo",
    totalVisits: fetchRandomVisits(),
    referenceVisits: fetchRandomPercentage(),
  };
type Props = {
  className?: string;
  title: string;
  description?: string;
  Icon?: LucideIcon;
  identifier?: string;
  fullScreenButton?: boolean;
}
export function PopularBetsCard({ title, description, Icon}: Props) {
    const totalAllVisits = trafficSources.totalVisits;
    const impactPercentage = (trafficSources.totalVisits / totalAllVisits) * 100;

  return (
    <GeneralCard className=' gap-1 h-full ' Icon={Icon} title={title} description={description}>
      <div  className="flex flex-col gap-2 w-full">
        <span className="text-base font-medium">{trafficSources.source}</span>
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
                value={trafficSources.totalVisits}
                locales="en-US"
                format={{ style: 'decimal' }}
                className="text-sm text- font-bold"
                />
            </div>
            </NumberFlowGroup>
        </div>
      </div>
    </GeneralCard> 
  )
}
