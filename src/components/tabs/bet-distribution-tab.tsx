import { DistributionBetsCard, type DistributionBetsData } from "../sportbooks/distribution-bets-card";
import { SchedulesBetsProgressCard, type Source } from "../sportbooks/schedules-bets-progress-card";
  const fetchRandomVisits = () => {
    return Math.floor(Math.random() * 1500) + 100;
  }

  const fetchRandomPercentage = () => {
    const random = (Math.floor(Math.random() * 100.55))
    return (random - 40)/1000
  }
  const distributionBets: DistributionBetsData[] = [
  {
    source: "Apuesta directa",
    averageBet: fetchRandomVisits(),
    totalBets: fetchRandomPercentage(),
    totalAmount: fetchRandomVisits(),
  },
  {
    source: "Parley",
    averageBet: fetchRandomVisits(),
    totalBets: fetchRandomPercentage(),
    totalAmount: fetchRandomVisits(),
  },
  {
    source: "Sistema",
    averageBet: fetchRandomVisits(),
    totalBets: fetchRandomPercentage(),
    totalAmount: fetchRandomVisits(),
  },
];

  const trafficSources: Source[] = [
    { label: "2 Selecciones", value: fetchRandomVisits() },
    { label: "3 Selecciones", value: fetchRandomVisits() },
    { label: "4 Selecciones", value: fetchRandomVisits() },
    { label: "5 Selecciones", value: fetchRandomVisits() },
    { label: "6 Selecciones", value: fetchRandomVisits() },
    { label: "7 Selecciones", value: fetchRandomVisits() },
    { label: "2 Selecciones", value: fetchRandomVisits() },
  ];


export default function BetDistributionTab() {
  return (
    <div className="w-full h-full flex flex-col gap-6">
      {distributionBets.map((bet, index) => (
        <DistributionBetsCard 
          key={index}
          averageBet={bet.averageBet}
          source={bet.source}
          totalBets={bet.totalBets}
          totalAmount={bet.totalAmount}
        />
      ))}
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <SchedulesBetsProgressCard values={trafficSources} title="Detalle de parlays" description="Distribución de número de selecciones"/>
        <SchedulesBetsProgressCard values={trafficSources} title="Detalle de sistemas" description="Distribución por tipo de sistema"/>
      </div>
    </div>
  );
}   