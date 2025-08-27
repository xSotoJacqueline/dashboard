import { type GeneralCardTopCardProps } from "@/components/general-top-card"
import { TopCard, TopCardContent, TopCardFooter, TopCardHeader, TopCardTitle, TopCardValue } from "../ui/general-top-card";
import CampaignsCard from "./campaings-card";

export type CampaignPerformanceProps = {
    title: string;
    status: "active" | "inactive" | "finished";
    alcance: number;
    ctr: number;
    conversiones: number;
  }

export default function CampaignTab({campaignValues}: {campaignValues: GeneralCardTopCardProps[]}) {

  return (
    <div className="w-full h-full flex flex-col  gap-6">
      <div className="grid w-full h-fit grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaignValues.map((metric, index) => (
            <TopCard
              isLoading={false}
              isError={false}
              iconSize={24}
              iconStrokeWidth={2}
              Icon={metric.Icon}
              index={index+5}
              valueFormat="currency"
              className="flex flex-col gap-6 justify-center items-center"
            >
              <TopCardHeader className="flex ">
                <TopCardTitle className="">{metric.title}</TopCardTitle>
              </TopCardHeader>
              <TopCardContent className='gap-6'>
                <TopCardValue className="text-4xl md:text-5xl"  valueFormat={metric.valueFormat} value={metric.value || 0}/>
              </TopCardContent>
              <TopCardFooter percentageValue={metric.percentageValue || 32} label={"Últimos 28 días"} showPercentage={true}  />
            </TopCard>
        ))}

      </div>
      <CampaignsCard />
    </div>
  );
}
