import { depositsWithdrawalQuantityQueryOptions, totalAmountFTDQueryOptions, totalFTDQueryOptions, totalTransactionsByTypeQueryOptions } from "@/queryOptions/queryOptions";
import { useQueries } from "@tanstack/react-query";
import { UsersRoundIcon, UserRoundPlus, MedalIcon, GiftIcon } from "lucide-react"
import { TopCard, TopCardContent, TopCardFooter, TopCardHeader, TopCardTitle, TopCardValue } from "../ui/general-top-card";

export default function DespistosTopCards({queryString, labelTimePeriod}: {queryString?: string, labelTimePeriod?: string}) {
  const [firstTimeDepositAverage,totalTransactionsByType, depositsWithdrawalQuantity, totalAmountFTD] = useQueries({
    queries: [totalFTDQueryOptions({queryString}), totalTransactionsByTypeQueryOptions({queryString}), depositsWithdrawalQuantityQueryOptions({queryString}), totalAmountFTDQueryOptions({queryString})],
  });
  

  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 ">
      <TopCard
        isLoading={totalTransactionsByType.isPending}
        isError={totalTransactionsByType.isError}
        iconSize={24}
        iconStrokeWidth={2}
        refetch={totalTransactionsByType.refetch}
        Icon={UserRoundPlus}
        index={1}
        valueFormat="currency"
        className="col-span-1 flex flex-col justify-between font-normal gap-3"
      >
        <TopCardHeader className="flex ">
          <TopCardTitle className="min-h-14">Monto total de depósitos</TopCardTitle>
        </TopCardHeader>
        <TopCardContent className='gap-4'>
          <TopCardValue  valueFormat="currency" value={totalTransactionsByType.data?.Deposit ? totalTransactionsByType.data.Deposit : 0}   />
        </TopCardContent>
        <TopCardFooter percentageValue={32} label={labelTimePeriod ? labelTimePeriod : `Últimos 28 días`} showPercentage={true}  />
      </TopCard>

      <TopCard
        isLoading={depositsWithdrawalQuantity.isPending}
        isError={totalTransactionsByType.isError}
        iconSize={24}
        iconStrokeWidth={2}
        Icon={GiftIcon}
        index={2}
        className="col-span-1 flex flex-col justify-between font-normal gap-3"
      >
        <TopCardHeader className="flex ">
          <TopCardTitle className="min-h-14">Número de depósitos</TopCardTitle>
        </TopCardHeader>
        <TopCardContent className='gap-4'>
          <TopCardValue valueFormat="decimal" value={depositsWithdrawalQuantity.data?.Deposit ? depositsWithdrawalQuantity.data.Deposit : 0}   />
        </TopCardContent>
        <TopCardFooter percentageValue={32} label={labelTimePeriod ? labelTimePeriod : `Últimos 28 días`} showPercentage={true}  />
      </TopCard>

      <TopCard
        isLoading={firstTimeDepositAverage.isPending}
        index={3}
        isError={firstTimeDepositAverage.isError}
        iconSize={24}
        iconStrokeWidth={2}
        Icon={UsersRoundIcon}
        className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col justify-between font-normal gap-3"
      >
        <TopCardHeader className="flex ">
          <TopCardTitle className="min-h-14">FTD’s</TopCardTitle>
        </TopCardHeader>
        <TopCardContent className='gap-4'>
          <TopCardValue valueFormat="decimal" value={firstTimeDepositAverage.data ? firstTimeDepositAverage.data : 0}   />
        </TopCardContent>
        <TopCardFooter percentageValue={32} label={labelTimePeriod ? labelTimePeriod : `Últimos 28 días`} showPercentage={true}  />
      </TopCard>

      <TopCard
        isLoading={totalAmountFTD.isPending}
        isError={totalAmountFTD.isError}
        iconSize={24}
        iconStrokeWidth={2}
        index={4}
        Icon={MedalIcon}
        valueFormat="currency"
        className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col justify-between font-normal gap-3"
      >
        <TopCardHeader className="flex ">
          <TopCardTitle className="min-h-14">Monto total de FTD’s</TopCardTitle>
        </TopCardHeader>
        <TopCardContent className='gap-4'>
          <TopCardValue valueFormat="currency" value={totalAmountFTD.data ? totalAmountFTD.data : 0}   />
        </TopCardContent>
        <TopCardFooter percentageValue={32} label={labelTimePeriod ? labelTimePeriod : `Últimos 28 días`} showPercentage={true}  />
      </TopCard>
    </div>
  );
}