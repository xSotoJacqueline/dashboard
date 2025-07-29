import { BarChartMarketing } from "../marketing/barChart";
import { TrafficSources, type TrafficSource } from "./traffic-sources";

export default function TrafficTab({ trafficSources }: { trafficSources: TrafficSource[] }) {
  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-6 gap-6">
      <BarChartMarketing title="Tráfico por día" />
      <TrafficSources trafficSources={trafficSources} />
    </div>
  );
}
