import { useQueries } from "@tanstack/react-query";
import { Users, Gamepad2Icon, ChartLineIcon } from "lucide-react"
import { TopCard, TopCardContent, TopCardFooter, TopCardHeader, TopCardTitle, TopCardValue } from "../ui/general-top-card";
import { getTotalPlayers, getTotalHybridPlayers, getRealTimeActivityUsers,  getTotalIncome } from "@/queryOptions/queryOptions-jugadores";
import { useMemo } from "react";
import { calculateGrowthPercentage, createComparisonQueryString } from "@/lib/utils";

export default function PlayersTopCards({queryString, labelTimePeriod}: {queryString?: string, labelTimePeriod?: string}) {

  const [totalPlayers, totalHybridPlayers, realTimeActivityUsers, totalIncome] = useQueries({
    queries: [getTotalPlayers({queryString}), getTotalHybridPlayers({queryString}), getRealTimeActivityUsers(), getTotalIncome({queryString})],
  });
  
  const comparisonQueryString = createComparisonQueryString(queryString);

  const [totalPlayersComparison, totalHybridPlayersComparison, totalIncomeComparison] = useQueries({
    queries: [
      getTotalPlayers({queryString: comparisonQueryString}),
      getTotalHybridPlayers({queryString: comparisonQueryString}),
      getTotalIncome({queryString: comparisonQueryString})
    ],
  });

  const totalPlayersPercentage = useMemo(() => calculateGrowthPercentage({
   current: totalPlayers.data || 0,
   previous: totalPlayersComparison.data || 0
  }), [totalPlayers.data, totalPlayersComparison.data]);

  const totalHybridPlayersPercentage = useMemo(() => calculateGrowthPercentage({
    current: totalHybridPlayers.data || 0,
    previous: totalHybridPlayersComparison.data || 0
  }), [totalHybridPlayers.data, totalHybridPlayersComparison.data]);

  const totalIncomePercentage = useMemo(() => calculateGrowthPercentage({
    current: totalIncome.data || 0,
    previous: totalIncomeComparison.data || 0
  }), [totalIncome.data, totalIncomeComparison.data]);

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
        <TopCardFooter percentageValue={totalPlayersPercentage} label={labelTimePeriod ? labelTimePeriod : `Últimos 28 días`} showPercentage={true}  />
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
        <TopCardFooter percentageValue={totalHybridPlayersPercentage} label={labelTimePeriod ? labelTimePeriod : `Últimos 28 días`} showPercentage={true}  />
      </TopCard>

      <TopCard
        isLoading={totalIncome.isPending}
        isError={totalIncome.isError}
        iconSize={24}
        iconStrokeWidth={2}
        refetch={totalIncome.refetch}
        Icon={ChartLineIcon}
        index={3}
        className="col-span-1 flex flex-col justify-between font-normal gap-3"
      >
        <TopCardHeader className="flex ">
          <TopCardTitle className="min-h-14">Ingresos Totales</TopCardTitle>
        </TopCardHeader>
        <TopCardContent className='gap-4'>
          <TopCardValue  valueFormat="decimal" value={totalIncome.data ? totalIncome.data : 0}   />
        </TopCardContent>
        <TopCardFooter percentageValue={totalIncomePercentage} label={labelTimePeriod ? labelTimePeriod : `Últimos 28 días`} showPercentage={true}  />
      </TopCard>

      <TopCard
        isLoading={realTimeActivityUsers.isPending}
        isError={realTimeActivityUsers.isError}
        iconSize={24}
        iconStrokeWidth={3}
        refetch={realTimeActivityUsers.refetch}
        Icon={Gamepad2Icon}
        index={4}
        className="col-span-1 flex flex-col justify-between font-normal gap-3"
      >
        <TopCardHeader className="flex ">
          <TopCardTitle className="min-h-14">Jugadores activos</TopCardTitle>
        </TopCardHeader>
        <TopCardContent className='gap-4'>
          <TopCardValue  valueFormat="decimal" value={realTimeActivityUsers.data ? realTimeActivityUsers.data : 0}   />
        </TopCardContent>
        <TopCardFooter label={"No aplica filtro"} showPercentage={false}  />
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