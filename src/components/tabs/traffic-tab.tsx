import { BarChartTrafficPerDayMarketing } from "../marketing/barChart-traffic-per-day-perday";
import { TrafficSources } from "./traffic-sources";

export default function TrafficTab({ queryString, labelTimePeriod }: { queryString?: string, labelTimePeriod?: string }) {
  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-6 gap-6">
      <BarChartTrafficPerDayMarketing queryString={queryString} labelTimePeriod={labelTimePeriod} />
      <TrafficSources />
    </div>
  );
}
