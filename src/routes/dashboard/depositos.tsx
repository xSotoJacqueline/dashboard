import { createFileRoute } from '@tanstack/react-router'
import { FTDAmountChart } from '@/components/depositos/ftd-AmountChart'
import { FirstFTDChart } from '@/components/depositos/first-FTDChart'
import ErrorPage from '@/components/errorPage'
import DespistosTopCards from '@/components/depositos/despistos-top-cards'
import { DepositsChart } from '@/components/depositos/deposits-chart'
import {PendingDepositos} from '@/components/depositos/pending-depositos'
import { PeriodSummaryCard } from '@/components/depositos/period-summary'

type generalUrlSearch ={
  dateFrom?: string;
  dateTo?: string;
}

export const Route = createFileRoute('/dashboard/depositos')({
      validateSearch: (search: Record<string, unknown>): generalUrlSearch => {
    // validate and parse the search params into a typed state
    return {
      dateFrom: search?.dateFrom as string | undefined,
      dateTo: search?.dateTo as string | undefined,
    }
  },
  component: RouteComponent,
  errorComponent: ({error}) => <ErrorPage error={error.message} />,
  pendingComponent: () => <PendingDepositos />
})

function RouteComponent() {

  return (
    <div className={`w-full flex flex-col gap-6 rounded-lg text-black h-full py-1`}>
        <DespistosTopCards/>

        <div className="w-full h-full max-h-full flex gap-6">
           <DepositsChart  />
        </div>

      <div className="h-fit grid grid-cols-1 md:grid-cols-2 gap-6">
        <FirstFTDChart /> 
        <FTDAmountChart />
      </div>

      <PeriodSummaryCard/>

    </div>
  )}
