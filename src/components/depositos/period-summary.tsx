
import NumberFlow from '@number-flow/react'
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
    averageAmountDeposits: number;
  }
export function PeriodSummaryCard({ title, description, identifier, averageAmountDeposits }: Props) {

  return (
    <GeneralCard classNameContainer="overflow-visible" className='h-full' identifier={identifier} title={title} description={description}>
      <div className='h-full w-full flex flex-col justify-center items-center '>

        <div className='w-full md:max-w-4/6 h-fit flex sm:flex-row flex-col justify-between gap-6 items-center'>
          <section className='flex flex-col justify-center items-center w-fit'>
            <div className='flex w-fit h-fit gap-0 items-center justify-center -mb-3'>
                <NumberFlow
                  value={averageAmountDeposits}
                  locales="en-US"
                  format={{ style: 'currency', currency: 'USD' }}
                  className="text-6xl font-bold w-fit text-primary"
                />
            </div>
            <span className='text- w-fit'>Déposito promedio</span>
          </section>
          <section className='flex flex-col justify-center items-center w-fit'>
            <div className='flex w-fit h-fit gap-0 items-center justify-center -mb-3'>
                <NumberFlow
                  value={0.22}
                  locales="en-US"
                  format={{ style: 'percent' }}
                  className="text-6xl font-bold w-fit text-primary"
                />
            </div>
            <span className='text- w-fit'>% Monto de FTD's</span>
          </section>

          <section className='flex flex-col justify-center items-center w-fit'>
            <div className='flex w-fit h-fit gap-0 items-center justify-center -mb-3'>
                <NumberFlow
                  value={32}
                  locales="en-US"
                  format={{ style: 'decimal' }}
                  className="text-6xl font-bold w-fit text-primary"
                />
            </div>
            <span className='text- w-fit'>Depositos por dia</span>
          </section>
        </div>
      </div>
    </GeneralCard> 
  )
}
