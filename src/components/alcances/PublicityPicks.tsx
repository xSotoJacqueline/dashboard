import { GeneralCard } from "../general-card";
import {
  type LucideIcon,
} from "lucide-react"
import NumberFlow, { NumberFlowGroup } from '@number-flow/react'
import { Progress } from "../ui/progress";

export type Source = {
  label: string;
  value: number;
}

export type PublicityPicksData = {
  time: Date
  sources: Source[]
}

export type PublicityPicksProps = {
  className?: string;
  title: string;
  description?: string;
  Icon?: LucideIcon;
  identifier?: string;
  fullScreenButton?: boolean;
  values: PublicityPicksData[];
}

export function PublicityPicks({title, description, Icon, identifier, values}: PublicityPicksProps) {

  return (
    <GeneralCard classNameContainer="overflow-hidden" className=" min-h-fit" cardContentClassName="h-fit" identifier={identifier} title={title} description={description} Icon={Icon}>
       <div className="w-full h-full min-h-fit flex flex-col gap-6">
        {values.map((time, index) => {
            return (
              <div key={index} className="w-full h-fit flex justify-between gap-4 items-center">
                  <span className="text-lg min-w-24 font-medium">{time.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  <div className="w-full h-fit flex flex-col gap-1">
                    {time.sources.map((source, index) => {
                        const totalAllVisits = time.sources.reduce((sum, src) => sum + src.value, 0);
                        const impactPercentage = (source.value / totalAllVisits) * 100;
                        return (
                              <div key={index} className="w-full flex h-fit  items-center justify-between gap-6">
                                  <span className="text-base min-w-24">{source.label}</span>
                                  <Progress
                                  className="h-1.5 mt-1 w-full"
                                  value={impactPercentage}
                              />
                              <NumberFlowGroup>
                              <div
                                  style={{ ['--number-flow-char-height' as string]: '0.85em'}}
                                  className="flex items-end justify-end text-end min-w-28"
                              >
                                  <NumberFlow
                                    value={source.value}
                                    locales="en-US"
                                    format={{ style: 'decimal' }}
                                    suffix=' apuestas'
                                    className="text-base"
                                  />
                              </div>
                              </NumberFlowGroup>
                          </div>
                        )
                    })}
                  </div>
              </div>
            )
        })}
        </div>
    </GeneralCard>
  )
}
