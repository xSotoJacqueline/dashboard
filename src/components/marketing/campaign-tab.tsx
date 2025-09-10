import { calculateGrowthPercentage, createComparisonQueryString } from "@/lib/utils";
import { TopCard, TopCardContent, TopCardFooter, TopCardHeader, TopCardTitle, TopCardValue } from "../ui/general-top-card";
import CampaignsCard from "./campaings-card";
import { getAverageClicksCTRPromedio, getConversiones, getTotalReachAlcance } from "@/queryOptions/queryOptions-marketing";
import { useQueries } from "@tanstack/react-query";
import { Circle, UserRoundPlus } from "lucide-react";
import { useMemo } from "react";

export type CampaignPerformanceProps = {
    title: string;
    status: "active" | "inactive" | "finished";
    alcance: number;
    ctr: number;
    conversiones: number;
  }

export default function CampaignTab({queryString,labelTimePeriod}: {queryString?: string, labelTimePeriod?: string}) {

    const [CTR, conversiones, alcance] = useQueries({
      queries: [getAverageClicksCTRPromedio({queryString}), getConversiones(), getTotalReachAlcance({queryString})],
    });

      const comparisonQueryString = createComparisonQueryString(queryString);
    
      const [CTRComparison, alcanceComparison] = useQueries({
        queries: [
          getAverageClicksCTRPromedio({queryString: comparisonQueryString}),
          getTotalReachAlcance({queryString: comparisonQueryString})
        ],
      });

      const CTRPercentage = useMemo(() => calculateGrowthPercentage({
        current: CTR.data || 0,
        previous: CTRComparison.data || 0
      }), [CTR.data, CTRComparison.data]);

      const alcancePercentage = useMemo(() => calculateGrowthPercentage({
        current: alcance.data || 0,
        previous: alcanceComparison.data || 0
      }), [alcance.data, alcanceComparison.data]);

  return (
    <div className="w-full h-full flex flex-col  gap-6">
      <div className="grid w-full h-fit grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <TopCard
              isLoading={CTR.isPending}
              isError={CTR.isError}
              iconSize={24}
              iconStrokeWidth={2}
              Icon={Circle}
              index={6}
              valueFormat="currency"
              className="flex flex-col gap-6 justify-center items-center"
            >
              <TopCardHeader className="flex ">
                <TopCardTitle className="">CTR Promedio</TopCardTitle>
              </TopCardHeader>
              <TopCardContent className='gap-6'>
                <TopCardValue className="text-4xl md:text-5xl"  valueFormat="percent" value={CTR.data || 0}/>
              </TopCardContent>
              <TopCardFooter percentageValue={CTRPercentage} label={labelTimePeriod ? labelTimePeriod : "Últmos 28 días"} showPercentage={true}  />
            </TopCard>

            <TopCard
              isLoading={alcance.isPending}
              isError={alcance.isError}
              iconSize={24}
              iconStrokeWidth={2}
              Icon={UserRoundPlus}
              index={8}
              valueFormat="currency"
              className="flex flex-col gap-6 justify-center items-center"
            >
              <TopCardHeader className="flex ">
                <TopCardTitle className="">Alcance Total</TopCardTitle>
              </TopCardHeader>
              <TopCardContent className='gap-6'>
                <TopCardValue className="text-4xl md:text-5xl"  valueFormat="decimal" value={alcance.data || 0}/>
              </TopCardContent>
              <TopCardFooter percentageValue={alcancePercentage} label={labelTimePeriod ? labelTimePeriod : "Últmos 28 días"} showPercentage={true}  />
            </TopCard>


            <TopCard
              isLoading={conversiones.isPending}
              isError={conversiones.isError}
              iconSize={24}
              iconStrokeWidth={2}
              Icon={UserRoundPlus}
              index={7}
              containerClassName="col-span-1 md:col-span-2 lg:col-span-1"
              className="flex flex-col gap-6 justify-center items-center "
            >
              <TopCardHeader className="flex ">
                <TopCardTitle className="">Conversiones</TopCardTitle>
              </TopCardHeader>
              <TopCardContent className='gap-6'>
                <TopCardValue className="text-4xl md:text-5xl"  valueFormat="decimal" value={conversiones.data || 0}/>
              </TopCardContent>
              <TopCardFooter label={"No aplica filtro"} showPercentage={false}  />
            </TopCard>



      </div>
      <CampaignsCard />
    </div>
  );
}
