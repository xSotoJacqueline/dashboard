import { useQueries } from "@tanstack/react-query";
import {MedalIcon, GiftIcon } from "lucide-react"
import { TopCard, TopCardContent, TopCardFooter, TopCardHeader, TopCardTitle, TopCardValue } from "../ui/general-top-card";
import { useMemo } from "react";
import { calculateGrowthPercentage, createComparisonQueryString } from "@/lib/utils";
import { getTotalRedemptions, getTotalGiftedAmount, getTotalConvertedAmount } from "@/queryOptions/queryOptions-bonos";
import { useContextQuery } from "@/contexts/query-context";

export default function BonosTopCards() {

  const { queryString } = useContextQuery();

  const [totalRedemptions, totalGiftedAmount, totalConvertedAmount] = useQueries({
    queries: [getTotalRedemptions({queryString}), getTotalGiftedAmount({queryString}), getTotalConvertedAmount({queryString})],
  });
  
  const comparisonQueryString = createComparisonQueryString(queryString);

  const [totalRedemptionsComparison, totalGiftedAmountComparison, totalConvertedAmountComparison] = useQueries({
    queries: [
      getTotalRedemptions({queryString: comparisonQueryString}),
      getTotalGiftedAmount({queryString: comparisonQueryString}),
      getTotalConvertedAmount({queryString: comparisonQueryString}),
    ],
  });

  const totalRedemptionsPercentage = useMemo(() => calculateGrowthPercentage({
   current: totalRedemptions.data || 0,
   previous: totalRedemptionsComparison.data || 0
  }), [totalRedemptions.data, totalRedemptionsComparison.data]);

  const totalGiftedAmountPercentage = useMemo(() => calculateGrowthPercentage({
    current: totalGiftedAmount.data || 0,
    previous: totalGiftedAmountComparison.data || 0
  }), [totalGiftedAmount.data, totalGiftedAmountComparison.data]);

  const totalConvertedAmountPercentage = useMemo(() => calculateGrowthPercentage({
    current: totalConvertedAmount.data || 0,
    previous: totalConvertedAmountComparison.data || 0
  }), [totalConvertedAmount.data, totalConvertedAmountComparison.data]);

  return (
    <div className="grid w-full  h-fit grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TopCard
        isLoading={totalRedemptions.isPending}
        isError={totalRedemptions.isError}
        iconSize={24}
        iconStrokeWidth={2}
        refetch={totalRedemptions.refetch}
        Icon={MedalIcon}
        index={1}
        containerClassName={"col-span-1"}
        className="col-span-1 flex flex-col justify-between font-normal gap-3"
      >
        <TopCardHeader  className="flex ">
          <TopCardTitle className="">Total redenciones</TopCardTitle>
        </TopCardHeader>
        <TopCardContent className='gap-4'>
          <TopCardValue  valueFormat="decimal" value={totalRedemptions.data ? totalRedemptions.data : 0}   />
        </TopCardContent>
        <TopCardFooter   percentageValue={totalRedemptionsPercentage} hasFilter={true} showPercentage={true}  />
      </TopCard>
      <TopCard
        isLoading={totalGiftedAmount.isPending}
        isError={totalGiftedAmount.isError}
        iconSize={24}
        iconStrokeWidth={2}
        refetch={totalGiftedAmount.refetch}
        Icon={GiftIcon}
        index={2}
        className="col-span-1 flex flex-col justify-between font-normal gap-3"
      >
        <TopCardHeader  className="flex ">
          <TopCardTitle className="">Monto Regalado</TopCardTitle>
        </TopCardHeader>
        <TopCardContent className='gap-4'>
          <TopCardValue  valueFormat="currency" value={totalGiftedAmount.data ? totalGiftedAmount.data : 0}   />
        </TopCardContent>
        <TopCardFooter percentageValue={totalGiftedAmountPercentage} hasFilter={true} showPercentage={true}  />
      </TopCard>

      <TopCard
        isLoading={totalConvertedAmountComparison.isPending}
        isError={totalConvertedAmountComparison.isError}
        iconSize={24}
        iconStrokeWidth={2}
        refetch={totalConvertedAmountComparison.refetch}
        Icon={GiftIcon}
        index={3}
        className="col-span-1 flex flex-col justify-between font-normal gap-3"
        containerClassName="col-span-1 md:col-span-2 lg:col-span-1 "
      >
        <TopCardHeader  className="flex ">
          <TopCardTitle className="">Convertido a dinero</TopCardTitle>
        </TopCardHeader>
        <TopCardContent className='gap-4'>
          <TopCardValue  valueFormat="currency" value={totalConvertedAmountComparison.data ? totalConvertedAmountComparison.data : 0}   />
        </TopCardContent>
        <TopCardFooter percentageValue={totalConvertedAmountPercentage} hasFilter={true} showPercentage={true}  />
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