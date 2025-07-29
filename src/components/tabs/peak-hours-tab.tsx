import { CloverIcon, Volleyball } from "lucide-react";
import { WeeklyBetsProgressCard } from "../sportbooks/weekly-bets-progress-card";
import { SchedulesBetsProgressCard, type Source } from "../sportbooks/schedules-bets-progress-card";

  const fetchRandomVisits = () => {
    return Math.floor(Math.random() * 1500) + 100;
  }
  const trafficSources: Source[] = [
    { label: "00:00 - 01:00", value: fetchRandomVisits() },
    { label: "01:00 - 02:00", value: fetchRandomVisits() },
    { label: "02:00 - 03:00", value: fetchRandomVisits() },
    { label: "03:00 - 04:00", value: fetchRandomVisits() },
    { label: "04:00 - 05:00", value: fetchRandomVisits() },
    { label: "05:00 - 06:00", value: fetchRandomVisits() },
    { label: "06:00 - 07:00", value: fetchRandomVisits() },
  ];

export default function PeakHoursTab() {
  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-6">
      <WeeklyBetsProgressCard identifier="chart5" title="Distribución por día de la semana" description="Actividad semanal de apuestas" Icon={CloverIcon} />
      <SchedulesBetsProgressCard values={trafficSources} identifier="chart6" title="Horarios con más apuestas" description="Actividad semanal de apuestas" Icon={Volleyball} />
    </div>
  );
}
