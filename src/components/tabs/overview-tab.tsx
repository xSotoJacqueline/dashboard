import { CloverIcon, Volleyball, ZapIcon } from "lucide-react";
import { EarningsProgressCard } from "../sportbooks/earnings-progress-card";
import { PublicityPicks, type PublicityPicksData } from "../alcances/PublicityPicks";
import { VisitTimeCard } from "../alcances/visit-time";


  const fetchRandomVisits = () => {
    return Math.floor(Math.random() * 1500) + 100;
  }
  const trafficSources: PublicityPicksData[] = [
    {time: new Date(), sources: [
      { label: "Facebook", value: fetchRandomVisits() },
      { label: "Instagram", value: fetchRandomVisits() },
      { label: "Twitter", value: fetchRandomVisits() },
      { label: "TikTok", value: fetchRandomVisits() },
    ]},
    {time: new Date(), sources: [
      { label: "Facebook", value: fetchRandomVisits() },
      { label: "Instagram", value: fetchRandomVisits() },
    
    ]},
    {time: new Date(), sources: [
      { label: "Instagram", value: fetchRandomVisits() },
      { label: "Twitter", value: fetchRandomVisits() },
    ]},
  
  ]

  
    const sources = [
    { label: "0-1 min", value: fetchRandomVisits() },
    { label: "1-3 min", value: fetchRandomVisits() },
    { label: "3-5 min", value: fetchRandomVisits() },
    { label: "+5 min", value: fetchRandomVisits() },
    ];
  



export default function OverviewTab() {
  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-6">
      <PublicityPicks values={trafficSources} identifier="chart1" title="Picos de publicidad" description="Actividad de bonos por hora en redes sociales" Icon={ZapIcon} />
      <VisitTimeCard values={sources} title="Tiempo de visita" description="Distribución del tiempo de usuarios"/>
      <EarningsProgressCard identifier="chart3" title="Tickets por casino" description="Distribución por ubicación" Icon={CloverIcon} />
      <EarningsProgressCard identifier="chart4" title="Tickets por deporte" description="Distribución por categoría deportiva" Icon={Volleyball} />
    </div>
  );
}
