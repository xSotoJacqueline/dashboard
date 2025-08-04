import { createFileRoute } from '@tanstack/react-router'
import { FTDAmountChart } from '@/components/depositos/ftd-AmountChart'
import { FirstFTDChart } from '@/components/depositos/first-FTDChart'
import ErrorPage from '@/components/errorPage'
import DespistosTopCards from '@/components/depositos/despistos-top-cards'
import { PeriodSummaryCard } from '@/components/depositos/period-summary'
import { DepositsChart } from '@/components/depositos/deposits-chart'
import {PendingDepositos} from '@/components/depositos/pending-depositos'
import { averageAmountDepositsQueryOptions, depositsWithdrawalQuantityQueryOptions, FTDQuantityByDayQueryOptions, getTotalDepositsByStatusAndDayQueryOptions, totalAmountFTDQueryOptions, totalFTDQueryOptions, totalTransactionsByTypeQueryOptions } from '@/queryOptions/queryOptions'
import { useSuspenseQueries } from '@tanstack/react-query'

export const Route = createFileRoute('/dashboard/depositos')({
  component: RouteComponent,
  errorComponent: ({error}) => <ErrorPage error={error.message} />,
  pendingComponent: () => <PendingDepositos />
})

function RouteComponent() {

  const [{data: firstTimeDepositAverage}, {data: totalTransactionsByType}, {data: allDeposits}, {data: ftdAmountChart}, {data: totalAmountFTD}, {data: averageAmountDeposits}, {data: depositsWithdrawalQuantity}] = useSuspenseQueries({
    queries: [totalFTDQueryOptions(), totalTransactionsByTypeQueryOptions(), getTotalDepositsByStatusAndDayQueryOptions(), FTDQuantityByDayQueryOptions(), totalAmountFTDQueryOptions(), averageAmountDepositsQueryOptions(), depositsWithdrawalQuantityQueryOptions()],
  });

  return (
    <div className={`w-full flex flex-col gap-6 rounded-lg text-black h-full py-1`}>
          <DespistosTopCards depositsQuantity={depositsWithdrawalQuantity.Deposit} totalAmountFTD={totalAmountFTD} firstTimeDepositAverage={firstTimeDepositAverage} totalTransactionsByType={totalTransactionsByType} />
          <div className="w-full h-full max-h-full flex gap-6">
           <DepositsChart allDeposits={allDeposits} />
          </div>


      <div className="h-fit grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="w-full h-full max-h-full flex gap-6">
            <FirstFTDChart ftdMount={ftdAmountChart} />
          </div>

        <FTDAmountChart />
      </div>

      <PeriodSummaryCard averageAmountDeposits={averageAmountDeposits} title='Resumen del período' />

    </div>
  )}
