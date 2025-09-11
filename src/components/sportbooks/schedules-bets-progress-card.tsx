
import NumberFlow, { NumberFlowGroup } from '@number-flow/react'
import { Progress } from "../ui/progress";
import { type LucideIcon } from "lucide-react";
import { GeneralCard } from '../general-card';

export type Source = {
  label: string;
  value: number;
}

  type Props = {
    className?: string;
    title: string;
    description?: string;
    Icon?: LucideIcon;
    identifier?: string;
    fullScreenButton?: boolean;
    values: Source[];
  }
export function SchedulesBetsProgressCard({ title, description, Icon, values }: Props) {

  const totalAllVisits = values.reduce((sum, src) => sum + src.value, 0);

  return (
    <GeneralCard hasFilter={false} classNameContainer="overflow-visible" className='h-full' Icon={Icon} title={title} description={description}>
      <div className='h-full w-full flex flex-col gap-4'>
        {values.map((source, index) => {
          const impactPercentage = (source.value / totalAllVisits) * 100;
            return (
              <div key={index} className="w-full flex h-fit  items-center justify-between gap-6">
                  <span className="text-base min-w-24">{source.label}</span>
                  <Progress
                  className="h-2 mt-1 w-full"
                  value={impactPercentage}
                  />
                  <NumberFlowGroup>
                  <div
                      style={{ ['--number-flow-char-height' as string]: '0.85em'}}
                      className="flex items-end justify-end text-end min-w-28 font-semibold"
                  >
                      <NumberFlow
                        value={source.value}
                        locales="en-US"
                        format={{ style: 'decimal' }}
                        suffix=' apuestas'
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
