
import NumberFlow from '@number-flow/react'
import { GeneralCard } from '../general-card';
import { averageAmountDepositsQueryOptions, globalAverageDepositQueryOptions, proportionalDepositFTDQueryOptions} from '@/queryOptions/queryOptions';
import { useQueries } from '@tanstack/react-query';
import CardLoading from '../loading-card';
import { Button } from '../ui/button';
import { CircleSlashIcon } from 'lucide-react';

export type Source = {
  label: string;
  value: number;
}

export function PeriodSummaryCard({queryString}: {queryString?: string}) {

  const [{data: averageAmountDeposits, error: averageAmountDepositsError, isPending: isPendingAverage, isFetching: isFetchingAverage}, {data: proportionalDepositFTD, error: proportionalDepositFTDError, refetch: refetchProportional, isPending: isPendingProportional, isFetching: isFetchingProportional}, {data: globalAverageDeposit, error: globalAverageDepositError, isPending: isPendingGlobalAverage, isFetching: isFetchingGlobalAverage, refetch: refetchGlobalAverage}] = useQueries({
    queries: [ averageAmountDepositsQueryOptions({queryString}), proportionalDepositFTDQueryOptions({queryString}), globalAverageDepositQueryOptions({queryString})],
  });

    if (isPendingProportional || isPendingAverage || isFetchingProportional || isFetchingAverage || isPendingGlobalAverage || isFetchingGlobalAverage) {
        return <CardLoading className="w-full h-full animate-pulse" title={true} children={<div className='min-h-[120px] h-full bg-foreground/10 rounded-md animate-pulse' />} />
    }

  return (
    <GeneralCard classNameContainer="overflow-visible" className='h-full' title={"Resumen del período"}>
      <div className='h-full w-full flex flex-col justify-center items-center '>

        <div className='w-full lg:max-w-4/6 h-fit flex sm:flex-row flex-col justify-between gap-6 items-center'>
          <section className='flex flex-col justify-center items-center w-fit'>
            {averageAmountDepositsError ? 
              <div className='text-5xl xl:text-6xl my-2 font-bold w-fit text-destructive h-fit'>Error</div> 
            : averageAmountDeposits ? (
               <NumberFlow
                value={averageAmountDeposits}
                locales="en-US"
                format={{ style: 'currency', currency: 'USD' }}
                className="text-5xl xl:text-6xl font-bold w-fit text-primary"
              />
                ) : <CircleSlashIcon className='size-[48px] xl:size-[60px] font-bold w-fit mt-5 mb-1'>Sin Datos</CircleSlashIcon> }

            {proportionalDepositFTDError ?
              <Button size={"sm"} variant={"link"} className='p-0 h-fit w-fit' onClick={() => refetchProportional()}>Reintentar</Button>
              :  
              <span className='w-fit'>Déposito promedio</span>
            }
          </section>
          <section className='flex flex-col justify-center h-full items-center w-fit'>
              {proportionalDepositFTDError ? 
              <div className='text-5xl xl:text-6xl my-2 font-bold w-fit text-destructive h-fit'>Error</div> 
            : proportionalDepositFTD ? (
                <NumberFlow
                  value={proportionalDepositFTD.proportion/100}
                  locales="en-US"
                  format={{ style: 'percent' }}
                  className="text-5xl xl:text-6xl font-bold w-fit text-primary"
                />
                ) : <CircleSlashIcon className='size-[48px] xl:size-[60px] font-bold w-fit mt-5 mb-1'>Sin Datos</CircleSlashIcon> }

            {proportionalDepositFTDError ?
              <Button size={"sm"} variant={"link"} className='p-0 h-fit w-fit' onClick={() => refetchProportional()}>Reintentar</Button>
              :  
              <span className='w-fit'>% Monto de FTD's</span>
            }
            
          </section>

          <section className='flex flex-col justify-center items-center w-fit'>
              {globalAverageDepositError ? 
              <div className='text-5xl xl:text-6xl my-2 font-bold w-fit text-destructive h-fit'>Error</div> 
            : globalAverageDeposit ? (
                <NumberFlow
                  value={globalAverageDeposit}
                  locales="en-US"
                  format={{ style: 'decimal' }}
                  className="text-5xl xl:text-6xl font-bold w-fit text-primary"
                />
                ) : <CircleSlashIcon className='size-[48px] xl:size-[60px] font-bold w-fit mt-5 mb-1'>Sin Datos</CircleSlashIcon> }

            {globalAverageDepositError ?
              <Button size={"sm"} variant={"link"} className='p-0 h-fit w-fit' onClick={() => refetchGlobalAverage()}>Reintentar</Button>
              :  
              <span className='w-fit'>Promedio global</span>
            }
          </section>
        </div>
      </div>
    </GeneralCard> 
  )
}
