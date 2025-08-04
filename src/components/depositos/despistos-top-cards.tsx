import { depositsWithdrawalQuantityQueryOptions, totalAmountFTDQueryOptions, totalFTDQueryOptions, totalTransactionsByTypeQueryOptions } from "@/queryOptions/queryOptions";
import { useQueries } from "@tanstack/react-query";
import { GeneralCardTopCard} from "@/components/general-top-card"
import { UsersRoundIcon, UserRoundPlus, MedalIcon, GiftIcon } from "lucide-react"
import CardLoading from "../loading-card";

export default function DespistosTopCards() {
  const [{data: firstTimeDepositAverage, refetch: firstTimeDepositRefetch, isPending: firstTimeDepositIsPending, error: firstTimeDepositError}, {data: totalTransactionsByType, refetch: totalTransactionsRefetch, isPending: totalTransactionsIsPending, error: totalTransactionsError}, {data: depositsWithdrawalQuantity, refetch: depositsWithdrawalRefetch, isPending: depositsWithdrawalIsPending, error: depositsWithdrawalError}, {data: totalAmountFTD, refetch: totalAmountFTDRefetch, isPending: totalAmountFTDIsPending, error: totalAmountFTDError}] = useQueries({
    queries: [totalFTDQueryOptions(), totalTransactionsByTypeQueryOptions(), depositsWithdrawalQuantityQueryOptions(), totalAmountFTDQueryOptions()],
  });

  const fetchData = () => {
    const random = (Math.floor(Math.random() * 100.55))
    return (random - 40)/1000
  }

  if (firstTimeDepositIsPending || totalTransactionsIsPending || depositsWithdrawalIsPending || totalAmountFTDIsPending) {
   return (<CardLoading className="w-full min-h-[723.8px] max-h-[723.8px] md:min-h-[410.6px] lg:min-h-[213.3px] xl:min-h-[193.3px] md:max-h-[354.6px] lg:max-h-[213.3px] xl:max-h-[193.3px] animate-pulse" children={<p></p>} />)
  }

  return (
    <div className="grid w-full min-h-[723.8px] max-h-[723.8px] md:min-h-[410.6px] lg:min-h-[213.3px] xl:min-h-[193.3px] md:max-h-[354.6px] lg:max-h-[213.3px] xl:max-h-[193.3px]grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        <GeneralCardTopCard
          containerClassName="col-span-1"
          value={totalAmountFTD}
          title="Monto total de FTD’s"
          refetch={totalAmountFTDRefetch}
          Icon={MedalIcon}
          isError={!!totalAmountFTDError}
          label="Últimos 28 días"
          percentageValue={fetchData()}
          valueFormat="currency"
        />

        <GeneralCardTopCard
          containerClassName="col-span-1"
          value={depositsWithdrawalQuantity?.Deposit}
          isError={!!depositsWithdrawalError}
          title="Número de depósitos"
          refetch={depositsWithdrawalRefetch}
          Icon={GiftIcon}
          label="Últimos 28 días"
          percentageValue={fetchData()}
          valueFormat="decimal"
        />
      
        <GeneralCardTopCard
          containerClassName="col-span-1"
          value={firstTimeDepositAverage}
          isError={!!firstTimeDepositError}
          title="FTD’s"
          refetch={firstTimeDepositRefetch}
          Icon={UsersRoundIcon}
          label="Últimos 28 días"
          percentageValue={fetchData()}
          valueFormat="decimal"
        />

        <GeneralCardTopCard
          containerClassName="col-span-1"
          value={totalTransactionsByType?.Deposit}
          isError={!!totalTransactionsError}
          title="Monto FTD’s"
          refetch={totalTransactionsRefetch}
          Icon={UserRoundPlus}
          label="Últimos 28 días"
          percentageValue={fetchData()}
          valueFormat="currency"
        />
    </div>
  );
}