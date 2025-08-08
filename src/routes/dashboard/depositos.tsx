import { createFileRoute, useSearch } from '@tanstack/react-router'
import { FTDAmountChart } from '@/components/depositos/ftd-AmountChart'
import { FirstFTDChart } from '@/components/depositos/first-FTDChart'
import ErrorPage from '@/components/errorPage'
import DespistosTopCards from '@/components/depositos/despistos-top-cards'
import { DepositsChart } from '@/components/depositos/deposits-chart'
import {PendingDepositos} from '@/components/depositos/pending-depositos'
import { PeriodSummaryCard } from '@/components/depositos/period-summary'
import type { GeneralSearch } from '@/types/search-types'
import { format } from 'date-fns'
import { useMemo } from 'react'
import { es } from 'date-fns/locale'

export const Route = createFileRoute('/dashboard/depositos')({
  validateSearch: (search: Record<string, unknown>): GeneralSearch => {
    return {
      from: typeof search?.from === 'number'
        ? search.from
        : undefined,
      to: typeof search?.to === 'number'
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
    
   const {queryString, labelTimePeriod} = useMemo(() => {
    const from = search.from ? new Date(search.from) : undefined;
    const to = search.to ? search.to : undefined;
    
    const startDate = from ? format(from, 'yyyy-MM-dd') : undefined;
    const endDate = to ? format(new Date(to), 'yyyy-MM-dd') : undefined;
    let labelTimePeriod = from && to ? `${format(from, 'd MMM yyyy', {locale: es})} - ${format(new Date(to), 'd MMM yyyy', {locale: es})}` : undefined;
    if(startDate === endDate) {
      labelTimePeriod = startDate ? `Fecha: ${format(new Date(startDate), 'd MMM yyyy', {locale: es})}` : undefined;
    } 
    return { labelTimePeriod, queryString: startDate && endDate ? `?startDate=${startDate}&endDate=${endDate}` : undefined };
   }, [search.from, search.to]);


  return (
    <div className={`w-full flex flex-col gap-6 rounded-lg text-black h-full py-1`}>
        <DespistosTopCards queryString={queryString} labelTimePeriod={labelTimePeriod} />

        <div className="w-full h-full max-h-full flex gap-6">
           <DepositsChart queryString={queryString} />
        </div>

      <div className="h-fit grid grid-cols-1 md:grid-cols-2 gap-6">
        <FirstFTDChart queryString={queryString} /> 
        <FTDAmountChart />
      </div>

      <PeriodSummaryCard queryString={queryString} />

    </div>
  )}
