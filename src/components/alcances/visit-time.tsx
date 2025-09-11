
import NumberFlow, { NumberFlowGroup } from '@number-flow/react'
import { Progress } from "../ui/progress";
import { Clock, type LucideIcon } from "lucide-react";
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
export function VisitTimeCard({ title, description, values, identifier }: Props) {

  const totalAllVisits = values.reduce((sum, src) => sum + src.value, 0);

  return (
    <GeneralCard hasFilter={false} classNameContainer="overflow-visible" className='h-full' identifier={identifier} Icon={Clock} title={title} description={description}>
      <div className='h-full w-full flex flex-col justify-between '>

        <div className='w-full h-fit flex justify-between gap-6 items-center'>
          <section className='flex flex-col justify-center items-center w-fit'>
            <div className='flex w-fit h-fit gap-0 items-center justify-center -mb-3'>
                <NumberFlow
                  value={4}
                  locales="en-US"
                  format={{ style: 'decimal' }}
                  suffix='m '
                  className="text-6xl font-bold w-fit text-primary"
                />
                <NumberFlow
                  value={32}
                  locales="en-US"
                  format={{ style: 'decimal' }}
                  suffix='s'
                  className="text-6xl font-bold w-fit text-primary"
                />
            </div>
            <span className='text- w-fit'>Promedio general</span>
          </section>
          <section className='flex flex-col justify-center items-center w-fit'>
            <div className='flex w-fit h-fit gap-0 items-center justify-center -mb-3'>
                <NumberFlow
                  value={4}
                  locales="en-US"
                  format={{ style: 'decimal' }}
                  suffix='m '
                  className="text-6xl font-bold w-fit text-primary"
                />
                <NumberFlow
                  value={32}
                  locales="en-US"
                  format={{ style: 'decimal' }}
                  suffix='s'
                  className="text-6xl font-bold w-fit text-primary"
                />
            </div>
            <span className='text- w-fit'>Promedio general</span>
          </section>
        </div>

        <div className='w-full flex flex-col h-fit'>
          {values.map((source, index) => {
            const impactPercentage = (source.value / totalAllVisits) * 100;
              return (
                <div key={index} className="w-full flex h-fit  items-center justify-between gap-6">
                    <span className="text-base min-w-16 text-start">{source.label}</span>
                    <Progress
                    className="h-2 mt-1 w-full"
                    value={impactPercentage}
                    />
                    <NumberFlowGroup>
                    <div
                        style={{ ['--number-flow-char-height' as string]: '0.85em'}}
                        className="flex items-end justify-end text-end min-w-10 font-semibold"
                    >
                        <NumberFlow
                          value={source.value/10000}
                          locales="en-US"
                          format={{ style: 'percent' }}
                          className="text-sm text- font-bold"
                        />
                    </div>
                    </NumberFlowGroup>
                </div>
              )
          })}
        </div>

      </div>
    </GeneralCard> 
  )
}
