import { useQueries } from "@tanstack/react-query";
import { UsersRoundIcon, UserRoundPlusIcon, UsersRound } from "lucide-react"
import { TopCard, TopCardContent, TopCardFooter, TopCardHeader, TopCardTitle, TopCardValue } from "../ui/general-top-card";
import { totalTraffic, uniqueUsers } from "@/queryOptions/queryOptions-metricas";
import { calculateGrowthPercentage, createComparisonQueryString } from "@/lib/utils";
import { useMemo } from "react";
import { getTotalRegistrations } from "@/queryOptions/queryOptions-marketing";
import { useContextQuery } from "@/contexts/query-context";

export default function MarketingTopCards() {
  const { queryString } = useContextQuery();
  const [totalTrafficInfo, uniqueUsersInfo, totalRegistrationsInfo] = useQueries({
    queries: [totalTraffic(), uniqueUsers({queryString}), getTotalRegistrations({queryString})],
  });

    const comparisonQueryString = createComparisonQueryString(queryString);

    const [uniqueUsersInfoComparison, totalRegistrationsInfoComparison] = useQueries({
      queries: [
        uniqueUsers({queryString: comparisonQueryString}),
        getTotalRegistrations({queryString: comparisonQueryString}),
      ],
    });

    const uniqueUsersPercentage = useMemo(() => calculateGrowthPercentage({
      current: uniqueUsersInfo.data || 0,
      previous: uniqueUsersInfoComparison.data || 0
    }), [uniqueUsersInfo.data, uniqueUsersInfoComparison.data]);

    const totalRegistrationsPercentage = useMemo(() => calculateGrowthPercentage({
      current: totalRegistrationsInfo.data || 0,
      previous: totalRegistrationsInfoComparison.data || 0
    }), [totalRegistrationsInfo.data, totalRegistrationsInfoComparison.data]);

  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
      <TopCard
        isLoading={totalTrafficInfo.isPending}
        isError={totalTrafficInfo.isError}
        iconSize={24}
        iconStrokeWidth={2}
        Icon={UsersRoundIcon}
        index={1}
        className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col justify-between font-normal gap-3"
      >
        <TopCardHeader className="flex gap-3">
          <TopCardTitle className="min-h-0">Tráfico total</TopCardTitle>
        </TopCardHeader>
        <TopCardContent className='gap-4'>
          <TopCardValue valueFormat="decimal" value={totalTrafficInfo.data ? totalTrafficInfo.data : 0}   />
        </TopCardContent>
        <TopCardFooter percentageValue={32} hasFilter={false} showPercentage={false}  />
      </TopCard>

      {/* <TopCard
        isLoading={totalTrafficInfo.isPending}
        isError={totalTrafficInfo.isError}
        iconSize={24}
        iconStrokeWidth={2}
        Icon={Gift}
        index={2}
        className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col justify-between font-normal gap-3"
      >
        <TopCardHeader className="flex gap-3">
          <TopCardTitle className="min-h-0">Bonus rate</TopCardTitle>
        </TopCardHeader>
        <TopCardContent className='gap-4'>
          <TopCardValue valueFormat="decimal" value={totalTrafficInfo.data ? totalTrafficInfo.data : 0}   />
        </TopCardContent>
        <TopCardFooter percentageValue={32} label={"No aplica filtro"} showPercentage={false}   />
      </TopCard> */}

      <TopCard
        isLoading={uniqueUsersInfo.isPending}
        isError={uniqueUsersInfo.isError}
        iconSize={24}
        iconStrokeWidth={2}
        Icon={UsersRound}
        index={3}
        className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col justify-between font-normal gap-3"
      >
        <TopCardHeader className="flex gap-3">
          <TopCardTitle className="min-h-0">Jugadores únicos</TopCardTitle>
        </TopCardHeader>
        <TopCardContent className='gap-4'>
          <TopCardValue valueFormat="decimal" value={uniqueUsersInfo.data ? uniqueUsersInfo.data : 0}   />
        </TopCardContent>
        <TopCardFooter percentageValue={uniqueUsersPercentage} hasFilter={true} showPercentage={false}   />
      </TopCard>

      <TopCard
        isLoading={totalRegistrationsInfo.isPending}
        isError={totalRegistrationsInfo.isError}
        iconSize={24}
        iconStrokeWidth={2}
        Icon={UserRoundPlusIcon}
        index={4}
        containerClassName="col-span-1 md:col-span-2 lg:col-span-1 "
        className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col justify-between font-normal gap-3"
      >
        <TopCardHeader className="flex gap-3">
          <TopCardTitle className="min-h-0">Registros totales</TopCardTitle>
        </TopCardHeader>
        <TopCardContent className='gap-4'>
          <TopCardValue valueFormat="decimal" value={totalRegistrationsInfo.data ? totalRegistrationsInfo.data : 0}   />
        </TopCardContent>
        <TopCardFooter percentageValue={totalRegistrationsPercentage} hasFilter={true} showPercentage={false}   />
      </TopCard>
    </div>
  );
}