import { useQueries } from "@tanstack/react-query";
import { UserRoundXIcon, UsersRoundIcon, UserPlusIcon, DollarSign } from "lucide-react"
import { TopCard, TopCardContent, TopCardFooter, TopCardHeader, TopCardTitle, TopCardValue, TopCardDescription } from "../ui/general-top-card";
import { useMemo } from "react";
import { calculateGrowthPercentage, createComparisonQueryString } from "@/lib/utils";
import { getAcquisitionRate, getAverageIncome, getDropoutRate, getCustomerLifetimeValue, getRetentionRate } from "@/queryOptions/queryOptions-metricas";
import { useContextQuery } from "@/contexts/query-context";

export default function MetricsTopCards() {

  const { queryString } = useContextQuery();
  const [acquisitionRate, averageIncome, dropoutRate, customerLifetimeValue, retentionRate] = useQueries({
    queries: [getAcquisitionRate({queryString}), getAverageIncome(), getDropoutRate({queryString}), getCustomerLifetimeValue(), getRetentionRate({queryString})],
  });
  
  const comparisonQueryString = createComparisonQueryString(queryString);

  const [acquisitionRateComparison, dropoutRateComparison, retentionRateComparison] = useQueries({
    queries: [
      getAcquisitionRate({queryString: comparisonQueryString}),
      getDropoutRate({queryString: comparisonQueryString}),
      getRetentionRate({queryString: comparisonQueryString}),
    ],
  });

  const acquisitionRatePercentage = useMemo(() => calculateGrowthPercentage({
   current: acquisitionRate.data || 0,
   previous: acquisitionRateComparison.data || 0
  }), [acquisitionRate.data, acquisitionRateComparison.data]);

  const dropoutRatePercentage = useMemo(() => calculateGrowthPercentage({
    current: dropoutRate.data || 0,
    previous: dropoutRateComparison.data || 0
   }), [dropoutRate.data, dropoutRateComparison.data]);

  const retentionRatePercentage = useMemo(() => calculateGrowthPercentage({
    current: retentionRate.data || 0,
    previous: retentionRateComparison.data || 0
  }), [retentionRate.data, retentionRateComparison.data]);

  return (
    <div className="grid w-full  h-fit grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      <TopCard
        isLoading={customerLifetimeValue.isPending}
        isError={customerLifetimeValue.isError}
        iconSize={24}
        iconStrokeWidth={2}
        refetch={customerLifetimeValue.refetch}
        Icon={UserPlusIcon}
        index={1}
        containerClassName={"col-span-1 md:col-span-2  lg:col-span-1"}
        className="col-span-1 flex flex-col justify-between font-normal gap-3"
      >
        <TopCardHeader  className="flex ">
          <TopCardTitle className="">CLTV</TopCardTitle>
          <TopCardDescription>Customer Lifetime Value</TopCardDescription>
        </TopCardHeader>
        <TopCardContent className='gap-4'>
          <TopCardValue  valueFormat="decimal" value={customerLifetimeValue.data ? customerLifetimeValue.data : 0}   />
        </TopCardContent>
        <TopCardFooter  hasFilter={false} showPercentage={false}  />
      </TopCard>
      <TopCard
        isLoading={acquisitionRate.isPending}
        isError={acquisitionRate.isError}
        iconSize={24}
        iconStrokeWidth={2}
        refetch={acquisitionRate.refetch}
        Icon={DollarSign}
        index={2}
        className="col-span-1 flex flex-col justify-between font-normal gap-3"
      >
        <TopCardHeader  className="flex ">
          <TopCardTitle className="">ARPU</TopCardTitle>
          <TopCardDescription>Ingreso Promedio por Usuario</TopCardDescription>
        </TopCardHeader>
        <TopCardContent className='gap-4'>
          <TopCardValue  valueFormat="currency" value={averageIncome.data ? averageIncome.data : 0}   />
        </TopCardContent>
        <TopCardFooter hasFilter={false} showPercentage={false}  />
      </TopCard>

      <TopCard
        isLoading={dropoutRate.isPending}
        isError={dropoutRate.isError}
        iconSize={24}
        iconStrokeWidth={2}
        refetch={dropoutRate.refetch}
        Icon={UserRoundXIcon}
        index={3}
        className="col-span-1 flex flex-col justify-between font-normal gap-3"
      >
        <TopCardHeader  className="flex ">
          <TopCardTitle className="">Deserción</TopCardTitle>
          <TopCardDescription>Tasa de deserción</TopCardDescription>
        </TopCardHeader>
        <TopCardContent className='gap-4'>
          <TopCardValue  valueFormat="percent" value={dropoutRate.data ? dropoutRate.data : 0}   />
        </TopCardContent>
        <TopCardFooter percentageValue={dropoutRatePercentage} hasFilter={true} showPercentage={true}  />
      </TopCard>


      <TopCard
        isLoading={acquisitionRate.isPending}
        isError={acquisitionRate.isError}
        iconSize={24}
        iconStrokeWidth={2}
        refetch={acquisitionRate.refetch}
        Icon={UserPlusIcon}
        index={4}
                containerClassName={"col-span-1 md:col-span-2  lg:col-span-2 xl:col-span-1"}

        className="col-span-1 md:col-span-2  lg:col-span-2 xl:col-span-1 flex flex-col justify-between font-normal gap-3"
      >
        <TopCardHeader className="flex ">
          <TopCardTitle className="">Adquisición</TopCardTitle>
          <TopCardDescription>Usuarios adquiridos</TopCardDescription>
        </TopCardHeader>
        <TopCardContent className='gap-4'>
          <TopCardValue  valueFormat="decimal" value={acquisitionRate.data ? acquisitionRate.data : 0}   />
        </TopCardContent>
        <TopCardFooter percentageValue={acquisitionRatePercentage} hasFilter={true} showPercentage={true}  />
      </TopCard>
      <TopCard
        isLoading={retentionRate.isPending}
        isError={retentionRate.isError}
        iconSize={24}
        iconStrokeWidth={2}
        refetch={retentionRate.refetch}
        Icon={UsersRoundIcon}
        index={5}
        containerClassName={"col-span-1 md:col-span-2  lg:col-span-1 xl:col-span-1"}
        className=" flex flex-col justify-between font-normal gap-3"
      >
        <TopCardHeader className="flex ">
          <TopCardTitle className="">Retención</TopCardTitle>
          <TopCardDescription>Tasa de retención</TopCardDescription>
        </TopCardHeader>
        <TopCardContent className='gap-4'>
          <TopCardValue  valueFormat="percent" value={retentionRate.data ? retentionRate.data : 0}   />
        </TopCardContent>
        <TopCardFooter percentageValue={retentionRatePercentage} hasFilter={true} showPercentage={true}  />
      </TopCard>



      {/* <TopCard
        isLoading={firstTimeDepositAverage.isPending}
        index={3}
        isError={firstTimeDepositAverage.isError}
        iconSize={24}
        iconStrokeWidth={2}
        Icon={UsersRoundIcon}
        className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col justify-between font-normal gap-3"
      >
        <TopCardHeader className="flex ">
          <TopCardTitle className="">FTD’s</TopCardTitle>
        </TopCardHeader>
        <TopCardContent className='gap-4'>
          <TopCardValue valueFormat="decimal" value={firstTimeDepositAverage.data ? firstTimeDepositAverage.data : 0}   />
        </TopCardContent>
        <TopCardFooter percentageValue={32} hasFilter={true} showPercentage={true}  />
      </TopCard> */}


    </div>
  );
}