import { GeneralCard, type GeneralCardProps } from "@/components/card-general"

export default function CampaignTab({campaignValues}: {campaignValues: GeneralCardProps[]}) {
  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="grid w-full h-fit grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaignValues.map((metric, index) => (
          <GeneralCard
            key={index}
            value={metric.value}
            title={metric.title}
            Icon={metric.Icon}
            label={metric.label}
            percentageValue={metric.percentageValue}
            valueFormat={metric.valueFormat}
            className="items-center justify-center"
          />
        ))}
      </div>
    </div>
  );
}
