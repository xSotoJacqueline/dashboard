import { createFileRoute, useSearch } from '@tanstack/react-router'
import { ChartSection } from "@/components/Retiros/ChartSectionVariant"
import { PlayersSection } from "@/components/Retiros/PlayersSection"
import { PeakHoursSection } from "@/components/Retiros/PeakHoursSection"
import { ScrollArea } from '@/components/ui/scroll-area'
import ErrorPage from '@/components/errorPage'
import type { GeneralSearch } from '@/types/search-types'
import { BarChart3 } from 'lucide-react'
import { TopCard, TopCardHeader, TopCardTitle, TopCardContent, TopCardValue, TopCardFooter } from '@/components/ui/general-top-card'
import { Label } from '@/components/ui/label'
import { useQueries } from '@tanstack/react-query'
import { averageAmountWithdrawalsPerDay, averageWithdrawalsPerDay, mostCommonWithdrawHour, percentageDepositsByDayOfWeek, TopPlayersMostWithdrawals, totalWithdrawals } from '@/queryOptions/queryOptions-retiros'
import { createQueryString } from '@/lib/utils'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/dashboard/retiros')({
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
  pendingComponent: () => <div className="w-full h-full flex items-center justify-center">Loading retiros...</div>,
})

function RouteComponent() {
   const search = useSearch({ from: '/dashboard/retiros' });
    
  const { queryString, labelTimePeriod } = createQueryString({ fromPeriod: search.from, toPeriod: search.to });

  const [averageAmountWithdrawals, averageWithdrawals, totalWithdrawalsData, topPlayersMostWithdrawalsData, mostCommonWithdrawHourData, percentageDepositsByDayOfWeekData] = useQueries({
    queries: [averageAmountWithdrawalsPerDay({queryString}), averageWithdrawalsPerDay({queryString}), totalWithdrawals({queryString}), TopPlayersMostWithdrawals({queryString}), mostCommonWithdrawHour({queryString}), percentageDepositsByDayOfWeek({queryString})],
  });

  return (
    <div className="w-full rounded-lg text-black h-full">
        <div className="flex flex-col h-full xl:flex-row justify-between gap-6 ">
          <div className="w-full flex flex-col gap- justify-between">
            <section className='w-full h-fit'>
              <div className="grid  w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 mb-8">
                  <TopCard
                    isLoading={totalWithdrawalsData.isPending}
                    isError={totalWithdrawalsData.isError}
                    iconSize={24}
                    iconStrokeWidth={2}
                    Icon={BarChart3}
                    valueFormat="decimal"
                    className="col-span-1 flex flex-col justify-center font-normal gap-3"
                    index={1}
                  >
                    <TopCardHeader className="flex flex-col-reverse gap-3">
                      <TopCardTitle className="min-h-0">Total de retiros</TopCardTitle>
                    </TopCardHeader>
                    <TopCardContent className='gap-4'>
                      <TopCardValue valueFormat="decimal" value={totalWithdrawalsData.data ? totalWithdrawalsData.data : 0}  className="text-4xl md:text-4xl font-bold" />
                      <Label className='font-normal text-muted-foreground'>Transacciones completadas</Label>
                    </TopCardContent>
                    <TopCardFooter percentageValue={32} label={labelTimePeriod ? labelTimePeriod : `Últimos 28 días`} showPercentage={true}  />
                  </TopCard>

                  <TopCard
                    isLoading={averageWithdrawals.isPending}
                    isError={averageWithdrawals.isError}
                    iconSize={24}
                    iconStrokeWidth={2}
                    Icon={BarChart3}
                    className="col-span-1 flex flex-col justify-center font-normal gap-3"
                    index={2}
                  >
                    <TopCardHeader className="flex flex-col-reverse gap-3">
                      <TopCardTitle className="min-h-0">Promedio de retiros</TopCardTitle>
                    </TopCardHeader>
                    <TopCardContent className='gap-4'>
                      <TopCardValue valueFormat="decimal" value={averageWithdrawals.data ? averageWithdrawals.data : 0}  className="text-4xl md:text-4xl font-bold" />
                      <Label className='font-normal text-muted-foreground'>Retiros diarios promedio</Label>
                    </TopCardContent>
                    <TopCardFooter percentageValue={32} label={labelTimePeriod ? labelTimePeriod : `Últimos 28 días`} showPercentage={true}  />
                  </TopCard>

                  <TopCard
                    isLoading={averageAmountWithdrawals.isPending}
                    isError={averageAmountWithdrawals.isError}
                    iconSize={24}
                    iconStrokeWidth={2}
                    Icon={BarChart3}
                    containerClassName="col-span-1 md:col-span-2 lg:col-span-1 "
                    valueFormat="currency"
                    className="flex flex-col justify-center font-normal gap-3"
                    index={3}
                  >
                    <TopCardHeader className="flex flex-col-reverse gap-3">
                      <TopCardTitle className="min-h-0">Monto de retiros</TopCardTitle>
                    </TopCardHeader>
                    <TopCardContent className='gap-4'>
                      <TopCardValue valueFormat="currency" value={averageAmountWithdrawals.data ? averageAmountWithdrawals.data : 0}  className="text-4xl md:text-4xl font-bold" />
                      <Label className='font-normal text-muted-foreground'>Retiros diarios promedio</Label>
                    </TopCardContent>
                    <TopCardFooter percentageValue={32} label={labelTimePeriod ? labelTimePeriod : `Últimos 28 días`} showPercentage={true}  />
                  </TopCard>
              </div>
            </section>
            <motion.div layoutId="tabs-list" className='w-full h-0' />      

            <ChartSection errorMessage={percentageDepositsByDayOfWeekData.error?.message} isPending={percentageDepositsByDayOfWeekData.isPending} isError={percentageDepositsByDayOfWeekData.isError} percentageDepositsByDayOfWeekData={percentageDepositsByDayOfWeekData.data}/>
          </div>
          <ScrollArea className="w-full xl:w-80 h-fit xl:h-[100cqh]">
            <div className='w-full h-fit xl:h-[100cqh] flex flex-col gap-6 '>
              <PlayersSection isError={topPlayersMostWithdrawalsData.isError} isPending={topPlayersMostWithdrawalsData.isPending} topPlayersMostWithdrawalsData={topPlayersMostWithdrawalsData.data?.slice(0, 5)} />
              <PeakHoursSection isError={mostCommonWithdrawHourData.isError} isPending={mostCommonWithdrawHourData.isPending} labelTimePeriod={labelTimePeriod} mostCommonWithdrawHourData={mostCommonWithdrawHourData.data} />
            </div>

          </ScrollArea>
        </div>
    </div>
  )}
