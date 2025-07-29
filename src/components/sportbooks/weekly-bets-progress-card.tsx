
import NumberFlow, { NumberFlowGroup } from '@number-flow/react'
import { Progress } from "../ui/progress";
import { type LucideIcon } from "lucide-react";
import { GeneralCard } from '../general-card';



export type DaySource = {
  day: string;
  value: number;
}

  const fetchRandomVisits = () => {
    return Math.floor(Math.random() * 1500) + 100;
  }
  const trafficSources: DaySource[] = [
    { day: "Lunes", value: fetchRandomVisits() },
    { day: "Martes", value: fetchRandomVisits() },
    { day: "Miércoles", value: fetchRandomVisits() },
    { day: "Jueves", value: fetchRandomVisits() },
    { day: "Viernes", value: fetchRandomVisits() },
    { day: "Sábado", value: fetchRandomVisits() },
    { day: "Domingo", value: fetchRandomVisits() },
  ];


  type Props = {
    className?: string;
    title: string;
    description?: string;
    Icon?: LucideIcon;
    identifier?: string;
    fullScreenButton?: boolean;
  }
export function WeeklyBetsProgressCard({ title, description, Icon}: Props) {

  const totalAllVisits = trafficSources.reduce((sum, src) => sum + src.value, 0);

  return (
    <GeneralCard classNameContainer="overflow-visible" className='h-full' Icon={Icon} title={title} description={description}>
      <div className='h-full w-full flex flex-col gap-4'>
        {trafficSources.map((source) => {
          const impactPercentage = (source.value / totalAllVisits) * 100;
            return (
              <div key={source.day} className="w-full flex h-fit  items-center justify-between gap-6">
                  <span className="text-base min-w-18">{source.day}</span>
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
