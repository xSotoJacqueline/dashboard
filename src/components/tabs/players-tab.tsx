import { Progress } from '../ui/progress';
import { BarChartPerDayMarketing } from '../marketing/barChart-campaigns-perday';
import UsersByCity from '../marketing/users-by-city'
import { getAverageTimeOnPage } from '@/queryOptions/queryOptions-marketing'
import { useQueries } from '@tanstack/react-query'
import { TopCard, TopCardContent, TopCardFooter, TopCardHeader, TopCardTitle, TopCardValue } from "../ui/general-top-card";
import { BarChartRegistersPerDayMarketing } from '../marketing/barChart-registers-perday'


export default function PlayersTab({queryString,labelTimePeriod}: {queryString?: string, labelTimePeriod?: string}) {
    const [averageTimeOnPage ] = useQueries({
      queries: [getAverageTimeOnPage({queryString})],
    });

  return (
    <div className="w-full h-full flex flex-col gap-6">
    <div className='h-fit md:h-[65cqh] w-full grid grid-cols-1 md:grid-cols-2 gap-6'>
      <BarChartPerDayMarketing queryString={queryString} labelTimePeriod={labelTimePeriod} />
      <BarChartRegistersPerDayMarketing queryString={queryString} />
    </div>
    <div className='h-full md:h-[35cqh] w-full grid grid-cols-2 md:grid-cols-6 gap-6'>
      <TopCard
        isLoading={averageTimeOnPage.isPending}
        isError={averageTimeOnPage.isError}
        iconSize={24}
        iconStrokeWidth={2}
        refetch={averageTimeOnPage.refetch}
        index={21}
        valueFormat="currency"
        containerClassName='w-full h-full border-0 gap-0 col-span-2 md:col-span-3 lg:col-span-2 space-y-0'
        className="flex flex-col justify-between font-normal gap-3"
      >
        <TopCardHeader className="flex ">
          <TopCardTitle className="">Retención 7 días</TopCardTitle>
        </TopCardHeader>
        <TopCardContent className='gap-4 flex flex-col justify-start pb-7'>
          <TopCardValue valueFormat="percent" value={20}   />
          <Progress value={70} className='' />
        </TopCardContent>
      </TopCard>

      <TopCard
        isLoading={averageTimeOnPage.isPending}
        isError={averageTimeOnPage.isError}
        iconSize={24}
        iconStrokeWidth={2}
        refetch={averageTimeOnPage.refetch}
        index={22}
        valueFormat="currency"
        containerClassName='w-full h-full border-0 gap-0 col-span-2 md:col-span-3 lg:col-span-2 space-y-0'
        className="flex flex-col justify-between font-normal gap-3"
      >
        <TopCardHeader className="flex ">
          <TopCardTitle className="">Sesión promedio</TopCardTitle>
        </TopCardHeader>
        <TopCardContent className='gap-4 flex-row justify-start'>
          <TopCardValue suffix="m" valueFormat="decimal" value={averageTimeOnPage.data?.minutes ? averageTimeOnPage.data.minutes : 0}   />
          <TopCardValue suffix="s" valueFormat="decimal" value={averageTimeOnPage.data?.seconds ? averageTimeOnPage.data.seconds : 0}   />
        </TopCardContent>
        <TopCardFooter percentageValue={32} label={labelTimePeriod ? labelTimePeriod : `Últimos 28 días`} showPercentage={true}  />
      </TopCard>


      <TopCard
        isLoading={averageTimeOnPage.isPending}
        isError={averageTimeOnPage.isError}
        iconSize={24}
        iconStrokeWidth={2}
        refetch={averageTimeOnPage.refetch}
        index={23}
        valueFormat="currency"
        containerClassName='w-full h-full border-0 gap-0 col-span-2 md:col-span-3 lg:col-span-2 space-y-0'
        className="flex flex-col justify-between font-normal gap-3"
      >
        <TopCardHeader className="flex ">
          <TopCardTitle className="">Tasa de conversión</TopCardTitle>
        </TopCardHeader>
        <TopCardContent className='gap-4 flex-row justify-start'>
          <TopCardValue valueFormat="percent" value={10}   />
        </TopCardContent>
        <TopCardFooter percentageValue={32} label={labelTimePeriod ? labelTimePeriod : `Últimos 28 días`} showPercentage={true}  />
      </TopCard>

    </div>
    <UsersByCity />


    </div>
  );
}
