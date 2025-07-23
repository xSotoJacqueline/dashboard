import { BarChartMarketing } from "./barChart";
import { TrafficSources, type TrafficSource } from "./traffic-sources";

export default function TrafficTab({ trafficSources }: { trafficSources: TrafficSource[] }) {
  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-6 gap-6">
      <BarChartMarketing className="col-span-1 md:col-span-4" title="Traffic Overview" />
      <TrafficSources className="col-span-1 md:col-span-2" trafficSources={trafficSources} />
    </div>
  );
}
