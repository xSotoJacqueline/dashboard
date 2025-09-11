import { BarChartPerDayMarketing } from '../marketing/barChart-campaigns-perday';
import UsersByCity from '../marketing/users-by-city'
import { getAverageTimeOnPage, getConversionRate, getRetentionRate } from '@/queryOptions/queryOptions-marketing'
import { useQueries } from '@tanstack/react-query'
import { TopCard, TopCardContent, TopCardFooter, TopCardHeader, TopCardTitle, TopCardValue } from "../ui/general-top-card";
import { BarChartRegistersPerDayMarketing } from '../marketing/barChart-registers-perday'
import { useContextQuery } from '@/contexts/query-context';

export default function PlayersTab() {
    const { queryString, labelTimePeriod } = useContextQuery();
    const [averageTimeOnPage, conversionRate, retentionRate] = useQueries({
      queries: [getAverageTimeOnPage({queryString}), getConversionRate(), getRetentionRate({queryString})],
    });

  return (
    <div className="w-full h-full flex flex-col gap-6">
    <div className='h-fit md:h-[65cqh] w-full grid grid-cols-1 md:grid-cols-2 gap-6'>
      <BarChartPerDayMarketing />
      <BarChartRegistersPerDayMarketing />
    </div>
    <div className='h-full min-h-fit w-full grid grid-cols-2 md:grid-cols-6 gap-6'>
      <TopCard
        isLoading={retentionRate.isPending}
        isError={retentionRate.isError}
        iconSize={24}
        iconStrokeWidth={2}
        refetch={retentionRate.refetch}
        index={21}
        valueFormat="currency"
        containerClassName='w-full h-full border-0 gap-0 col-span-2 md:col-span-3 lg:col-span-2 space-y-0'
        className="flex flex-col justify-between font-normal gap-3"
      >
        <TopCardHeader className="flex ">
          <TopCardTitle className="">Retención</TopCardTitle>
        </TopCardHeader>
        <TopCardContent className='gap-4 flex flex-col'>
          <TopCardValue className='text-4xl md:text-5xl' valueFormat="percent" value={retentionRate.data ? retentionRate.data : 0}   />
          {/* <Progress value={70} className='' /> */}
        </TopCardContent>
        <TopCardFooter label={labelTimePeriod ? labelTimePeriod : `Últimos 28 días`} showPercentage={false}  />

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
          <TopCardValue className='text-4xl md:text-5xl' suffix="m" valueFormat="decimal" value={averageTimeOnPage.data?.minutes ? averageTimeOnPage.data.minutes : 0}   />
          <TopCardValue className='text-4xl md:text-5xl' suffix="s" valueFormat="decimal" value={averageTimeOnPage.data?.seconds ? averageTimeOnPage.data.seconds : 0}   />
        </TopCardContent>
        <TopCardFooter percentageValue={32} label={labelTimePeriod ? labelTimePeriod : `Últimos 28 días`} showPercentage={true}  />
      </TopCard>


      <TopCard
        isLoading={conversionRate.isPending}
        isError={conversionRate.isError}
        iconSize={24}
        iconStrokeWidth={2}
        refetch={conversionRate.refetch}
        index={23}
        valueFormat="percent"
        containerClassName='w-full h-full border-0 gap-0 col-span-2 md:col-span-6 lg:col-span-2 space-y-0'
        className="flex flex-col justify-between font-normal gap-3"
      >
        <TopCardHeader className="flex ">
          <TopCardTitle className="">Tasa de conversión</TopCardTitle>
        </TopCardHeader>
        <TopCardContent className='gap-4 flex-row justify-start'>
          <TopCardValue className='text-4xl md:text-5xl' valueFormat="percent" value={conversionRate.data ? conversionRate.data : 0}   />
        </TopCardContent>
        <TopCardFooter label={"No aplica filtro"} showPercentage={false}  />
      </TopCard>

    </div>
    <UsersByCity />


    </div>
  );
}
