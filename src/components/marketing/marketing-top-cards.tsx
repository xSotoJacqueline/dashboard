import { useQueries } from "@tanstack/react-query";
import { UsersRoundIcon, Gift, UserRoundPlusIcon, UsersRound } from "lucide-react"
import { TopCard, TopCardContent, TopCardFooter, TopCardHeader, TopCardTitle, TopCardValue } from "../ui/general-top-card";
import { totalTraffic, uniqueUsers } from "@/queryOptions/queryOptions-metricas";

export default function MarketingTopCards() {
  const [totalTrafficInfo, uniqueUsersInfo] = useQueries({
    queries: [totalTraffic(), uniqueUsers()],
  });
  

  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 ">
      <TopCard
        isLoading={totalTrafficInfo.isPending}
        isError={totalTrafficInfo.isError}
        iconSize={24}
        iconStrokeWidth={2}
        Icon={UsersRoundIcon}
        className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col justify-between font-normal gap-3"
      >
        <TopCardHeader className="flex gap-3">
          <TopCardTitle className="min-h-0">Tráfico Total</TopCardTitle>
        </TopCardHeader>
        <TopCardContent className='gap-4'>
          <TopCardValue valueFormat="decimal" value={totalTrafficInfo.data ? totalTrafficInfo.data : 0}   />
        </TopCardContent>
        <TopCardFooter percentageValue={32} label={"No aplica filtro"} showPercentage={false}  />
      </TopCard>

      <TopCard
        isLoading={totalTrafficInfo.isPending}
        isError={totalTrafficInfo.isError}
        iconSize={24}
        iconStrokeWidth={2}
        Icon={Gift}
        className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col justify-between font-normal gap-3"
      >
        <TopCardHeader className="flex gap-3">
          <TopCardTitle className="min-h-0">Bonus Rate</TopCardTitle>
        </TopCardHeader>
        <TopCardContent className='gap-4'>
          <TopCardValue valueFormat="decimal" value={totalTrafficInfo.data ? totalTrafficInfo.data : 0}   />
        </TopCardContent>
        <TopCardFooter percentageValue={32} label={"No aplica filtro"} showPercentage={false}   />
      </TopCard>


      <TopCard
        isLoading={uniqueUsersInfo.isPending}
        isError={uniqueUsersInfo.isError}
        iconSize={24}
        iconStrokeWidth={2}
        Icon={UsersRound}
        className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col justify-between font-normal gap-3"
      >
        <TopCardHeader className="flex gap-3">
          <TopCardTitle className="min-h-0">Jugadores Únicos</TopCardTitle>
        </TopCardHeader>
        <TopCardContent className='gap-4'>
          <TopCardValue valueFormat="decimal" value={uniqueUsersInfo.data ? uniqueUsersInfo.data : 0}   />
        </TopCardContent>
        <TopCardFooter percentageValue={32} label={"No aplica filtro"} showPercentage={false}   />
      </TopCard>

      <TopCard
        isLoading={uniqueUsersInfo.isPending}
        isError={uniqueUsersInfo.isError}
        iconSize={24}
        iconStrokeWidth={2}
        Icon={UserRoundPlusIcon}
        className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col justify-between font-normal gap-3"
      >
        <TopCardHeader className="flex gap-3">
          <TopCardTitle className="min-h-0">Registros Totales</TopCardTitle>
        </TopCardHeader>
        <TopCardContent className='gap-4'>
          <TopCardValue valueFormat="decimal" value={uniqueUsersInfo.data ? uniqueUsersInfo.data : 0}   />
        </TopCardContent>
        <TopCardFooter percentageValue={32} label={"No aplica filtro"} showPercentage={false}   />
      </TopCard>



    </div>
  );
}