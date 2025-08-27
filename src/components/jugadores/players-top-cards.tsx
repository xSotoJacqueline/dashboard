import { useQueries } from "@tanstack/react-query";
import { Users } from "lucide-react"
import { TopCard, TopCardContent, TopCardFooter, TopCardHeader, TopCardTitle, TopCardValue } from "../ui/general-top-card";
import { getTotalPlayers, getTotalHybridPlayers } from "@/queryOptions/queryOptions-jugadores";

export default function PlayersTopCards({queryString, labelTimePeriod}: {queryString?: string, labelTimePeriod?: string}) {
  const [totalPlayers, totalHybridPlayers] = useQueries({
    queries: [getTotalPlayers({queryString}), getTotalHybridPlayers({queryString})],
  });
  

  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 ">
      <TopCard
        isLoading={totalPlayers.isPending}
        isError={totalPlayers.isError}
        iconSize={24}
        iconStrokeWidth={2}
        refetch={totalPlayers.refetch}
        Icon={Users}
        index={1}
        className="col-span-1 flex flex-col justify-between font-normal gap-3"
      >
        <TopCardHeader className="flex ">
          <TopCardTitle className="min-h-14">Total de Usuarios</TopCardTitle>
        </TopCardHeader>
        <TopCardContent className='gap-4'>
          <TopCardValue  valueFormat="decimal" value={totalPlayers.data ? totalPlayers.data : 0}   />
        </TopCardContent>
        <TopCardFooter percentageValue={32} label={labelTimePeriod ? labelTimePeriod : `Últimos 28 días`} showPercentage={true}  />
      </TopCard>

      <TopCard
        isLoading={totalHybridPlayers.isPending}
        isError={totalHybridPlayers.isError}
        iconSize={24}
        iconStrokeWidth={2}
        refetch={totalHybridPlayers.refetch}
        Icon={Users}
        index={2}
        className="col-span-1 flex flex-col justify-between font-normal gap-3"
      >
        <TopCardHeader className="flex ">
          <TopCardTitle className="min-h-14">Usuarios híbridos</TopCardTitle>
        </TopCardHeader>
        <TopCardContent className='gap-4'>
          <TopCardValue  valueFormat="decimal" value={totalHybridPlayers.data ? totalHybridPlayers.data : 0}   />
        </TopCardContent>
        <TopCardFooter percentageValue={32} label={labelTimePeriod ? labelTimePeriod : `Últimos 28 días`} showPercentage={true}  />
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
          <TopCardTitle className="min-h-14">FTD’s</TopCardTitle>
        </TopCardHeader>
        <TopCardContent className='gap-4'>
          <TopCardValue valueFormat="decimal" value={firstTimeDepositAverage.data ? firstTimeDepositAverage.data : 0}   />
        </TopCardContent>
        <TopCardFooter percentageValue={32} label={labelTimePeriod ? labelTimePeriod : `Últimos 28 días`} showPercentage={true}  />
      </TopCard> */}


    </div>
  );
}