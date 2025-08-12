import { GeneralCardTopCard, type GeneralCardTopCardProps } from "@/components/general-top-card"
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card"
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";

export type CampaignPerformanceProps = {
    title: string;
    status: "active" | "inactive" | "finished";
    alcance: number;
    ctr: number;
    conversiones: number;
  }

export default function CampaignTab({campaignValues, campaignPerformanceValues}: {campaignValues: GeneralCardTopCardProps[], campaignPerformanceValues: CampaignPerformanceProps[]}) {



  return (
    <div className="w-full h-full flex flex-col  gap-6">
      <div className="grid w-full h-fit grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaignValues.map((metric, index) => (
          <GeneralCardTopCard
            key={index}
            value={metric.value}
            title={metric.title}
            Icon={metric.Icon}
            label={metric.label}
            percentageValue={metric.percentageValue}
            valueFormat={metric.valueFormat}
            numberSectionClassName="items-center justify-center"
            className="items-center justify-center flex w-full"
          />
        ))}
      </div>

      <Card className={`w-full h-fit pb-0 border-0`}>
          <CardHeader>
              <CardTitle className="text-xl font-semibold">Rendimiento de Campañas</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Resultados detallados de tus campañas activas
              </CardDescription>
          </CardHeader>
          <CardContent  className=" @container-normal relative sm:pt-0 h-fit" >
            <ScrollArea className="w-full h-[500px] ">
              <div className="h-fit w-full flex flex-col gap-4">
                {campaignPerformanceValues.map((campaign, index) => (
                  <Card key={index} className="flex flex-row items-center justify-between px-3 py-3">
                    <div className="flex flex-col items-start">
                      <h3 className="text-lg font-bold">{campaign.title}</h3>
                      <Badge className="rounded-full px-4 bg-foreground" >
                        {campaign.status === "active" ? "Activo" : campaign.status === "inactive" ? "Inactivo" : "Finalizado"}
                      </Badge>
                    </div>
                    <div className="flex gap-6 text-sm text-foreground">
                      <div className="flex flex-col items-center">
                        <span className="font-bold text-base">{(campaign.alcance * 100).toFixed(2).toLocaleString().slice(0, 3)}</span>
                        <span className="font-semibold -mt-2">Alcance</span>
                      </div>
                      <div className="flex flex-col items-center ">
                        <span className="font-bold text-base">{(campaign.ctr * 100).toFixed(2).toLocaleString().slice(0, 3)}%</span>
                        <span className="font-semibold -mt-2">CTR</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="font-bold text-base">{(campaign.conversiones * 100).toFixed(2).toLocaleString().slice(0, 3)}</span>
                        <span className="font-semibold -mt-2">Conversiones</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

            </ScrollArea>
            
          </CardContent>

      </Card>
    </div>
  );
}
