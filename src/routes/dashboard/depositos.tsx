import { createFileRoute } from '@tanstack/react-router'
import { EarningsClientBonosChart } from '@/components/bonos/earningsClientBonosChart'
import { FTDAmountChart } from '@/components/depositos/ftd-AmountChart'
import { FirstFTDChart } from '@/components/depositos/first-FTDChart'
import ErrorPage from '@/components/errorPage'
import DespistosTopCards from '@/components/depositos/despistos-top-cards'
import { Suspense } from 'react'
import CardLoading from '@/components/loading-card'
import { PeriodSummaryCard } from '@/components/depositos/period-summart¿y'

export const Route = createFileRoute('/dashboard/depositos')({
  component: RouteComponent,
  errorComponent: ({error}) => <ErrorPage error={error.message} />,
})

function RouteComponent() {

  return (
    <div className={`w-full flex flex-col gap-6 rounded-lg text-black h-full py-1`}>
        <Suspense
          fallback={
            <CardLoading className="w-full min-h-[841.2px] max-h-[841.2px] md:min-h-[354.6px] lg:min-h-[185.3px] xl:min-h-[165.3px] md:max-h-[354.6px] lg:max-h-[185.3px] xl:max-h-[165.3px] animate-pulse" children={<p></p>} />
          }
        >
          <DespistosTopCards />
        </Suspense>

      <div className="w-full h-full max-h-full flex gap-6">
        <EarningsClientBonosChart />
      </div>
      <div className="h-fit grid grid-cols-1 md:grid-cols-2 gap-6">
        <FirstFTDChart />
        <FTDAmountChart />
      </div>

      <PeriodSummaryCard title='Resumen del período' />

    </div>
  )}
