import { createFileRoute } from '@tanstack/react-router'
import { FTDAmountChart } from '@/components/depositos/ftd-AmountChart'
import { FirstFTDChart } from '@/components/depositos/first-FTDChart'
import ErrorPage from '@/components/errorPage'
import DespistosTopCards from '@/components/depositos/despistos-top-cards'
import { Suspense } from 'react'
import CardLoading from '@/components/loading-card'
import { PeriodSummaryCard } from '@/components/depositos/period-summart¿y'
import { DepositsChart } from '@/components/depositos/deposits-chart'
import {PendingDepositos} from '@/components/depositos/pending-depositos'

export const Route = createFileRoute('/dashboard/depositos')({
  component: RouteComponent,
  errorComponent: ({error}) => <ErrorPage error={error.message} />,
  pendingComponent: () => <PendingDepositos />
})

function RouteComponent() {

  return (
    <div className={`w-full flex flex-col gap-6 rounded-lg text-black h-full py-1`}>
        <Suspense
          fallback={
            <CardLoading className="w-full min-h-[841.2px] max-h-[841.2px] md:min-h-[354.6px] lg:min-h-[185.3px] xl:min-h-[165.3px] md:max-h-[354.6px] lg:max-h-[185.3px] xl:max-h-[165.3px] animate-pulse" />
          }
        >
          <DespistosTopCards />
        </Suspense>


        <Suspense
          fallback={
            <CardLoading className="w-full h-full animate-pulse" title={true} children={<div className='min-h-[125px] h-full bg-foreground/10 rounded-md animate-pulse' />} />
          }
        >
          <div className="w-full h-full max-h-full flex gap-6">

           <DepositsChart />
          </div>

        </Suspense>

      <div className="h-fit grid grid-cols-1 md:grid-cols-2 gap-6">

                <Suspense
          fallback={
            <CardLoading className="w-full h-full animate-pulse" title={true} children={<div className='min-h-[125px] h-full bg-foreground/10 rounded-md animate-pulse' />} />
          }
        >
          <div className="w-full h-full max-h-full flex gap-6">

                   <FirstFTDChart />

          </div>

        </Suspense>
        <FTDAmountChart />
      </div>

      <PeriodSummaryCard title='Resumen del período' />

    </div>
  )}
