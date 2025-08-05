import { createFileRoute, useSearch } from '@tanstack/react-router'
import { FTDAmountChart } from '@/components/depositos/ftd-AmountChart'
import { FirstFTDChart } from '@/components/depositos/first-FTDChart'
import ErrorPage from '@/components/errorPage'
import DespistosTopCards from '@/components/depositos/despistos-top-cards'
import { DepositsChart } from '@/components/depositos/deposits-chart'
import {PendingDepositos} from '@/components/depositos/pending-depositos'
import { PeriodSummaryCard } from '@/components/depositos/period-summary'
import type { GeneralSearch } from '@/types/search-types'
import { addHours, format, setHours, addDays } from 'date-fns'
import { es } from 'date-fns/locale/es'

export const Route = createFileRoute('/dashboard/depositos')({
  validateSearch: (search: Record<string, unknown>): GeneralSearch => {
    return {
      from: typeof search?.from === 'string'
        ? search.from
        : undefined,
      to: typeof search?.to === 'string'
        ? search.to
        : undefined,
    }
  },
  component: RouteComponent,
  errorComponent: ({error}) => <ErrorPage error={error.message} />,
  pendingComponent: () => <PendingDepositos />
})

function RouteComponent() {
   const search = useSearch({ from: '/dashboard/depositos' });

    const from = search.from ? addDays(setHours(new Date(search.from), 0), 1) : undefined;
    console.log("from", from)
    const to = search.to ? addHours(new Date(search.to), 12) : undefined;
    console.log("depositos from", from ? format(from, 'd MMM yyyy', { locale: es }) : undefined);
    console.log("depositos to", to ? format(to, 'd MMM yyyy', { locale: es }) : undefined);

  return (
    <div className={`w-full flex flex-col gap-6 rounded-lg text-black h-full py-1`}>
        <DespistosTopCards/>

        <div className="w-full h-full max-h-full flex gap-6">
           <DepositsChart />
        </div>

      <div className="h-fit grid grid-cols-1 md:grid-cols-2 gap-6">
        <FirstFTDChart /> 
        <FTDAmountChart />
      </div>

      <PeriodSummaryCard/>

    </div>
  )}
