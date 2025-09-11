import { Calendar } from "lucide-react"
import { Pie, PieChart } from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useIsMobile } from "@/hooks/use-mobile"
import { GeneralCard } from "../general-card"
import type { PercentageDepositsByDayOfWeekData } from "@/queryOptions/queryOptions-retiros"
import CardLoading from "../loading-card"
import { GeneralErrorContent } from "../general-error-content"
import { GeneralEmptyContent } from "../general-empty-content"

const chartConfig = {
  percentage: {
    label: "Retiros",
  },
  Monday: {
    label: "Monday",
    color: "var(--lunes)",
  },
  Tuesday: {
    label: "Tuesday",
    color: "var(--martes)",
  },
  Wednesday: {
    label: "Wednesday",
    color: "var(--miercoles)",
  },
  Thursday: {
    label: "Thursday",
    color: "var(--jueves)",
  },
  Friday: {
    label: "Friday",
    color: "var(--viernes)",
  },
  Saturday: {
    label: "Saturday",
    color: "var(--sabado)",
  },
  Sunday: {
    label: "Sunday",
    color: "var(--domingo)",
  },
} satisfies ChartConfig


export function ChartSection({ percentageDepositsByDayOfWeekData, errorMessage, isError, isPending }: { percentageDepositsByDayOfWeekData?: PercentageDepositsByDayOfWeekData, errorMessage?: string, isError: boolean, isPending: boolean }) {
  const isMobile = useIsMobile({MOBILE_BREAKPOINT:900})


  if (isPending) return <CardLoading className="animate-pulse min-h-[724px] sm:min-h-[444px] md:min-h-[472px] lg:min-h-[444px]" children={<p/>} />
  if (isError) return <GeneralErrorContent errorMessage={errorMessage} className="min-h-[724px] sm:min-h-[444px] md:min-h-[472px] lg:min-h-[444px]" />

  if (!percentageDepositsByDayOfWeekData || percentageDepositsByDayOfWeekData.length === 0) return <GeneralEmptyContent />;

  const dayTranslations: Record<string, string> = {
    Monday: "Lunes",
    Tuesday: "Martes",
    Wednesday: "Miércoles",
    Thursday: "Jueves",
    Friday: "Viernes",
    Saturday: "Sábado",
    Sunday: "Domingo",
  };

  const chartData = percentageDepositsByDayOfWeekData.map(item => ({
    day: dayTranslations[item.day] || item.day,
    count: item.count,
    percentage: item.percentage,
    fill: chartConfig[item.day]?.color,
  }));

  return (
    <GeneralCard hasFilter={false} cardContentClassName="pb-6 h-full"  identifier="chart1" title="Días en los que más retiros se realizan" Icon={Calendar}>
      <section className="w-full flex sm:flex-row flex-col justify-center h-full items-center sm:justify-between">
          <div className="w-full sm:w-fit h-full max-w-xs">
          <table className="w-full h-full">
            <thead>
            <tr className="text-left text-lg font-bold text-primary">
              <th className="flex pl-8 justify-center">Día</th>
              <th className="pr-2 text-right">%</th>
            </tr>
            </thead>
            <tbody>
            {chartData.map((item, index) => (
              <tr key={index} className="h-9">
                <td className="align-middle">
                  <div className="flex relative items-center gap-3 justify-center">
                    <div className="w-3 absolute left-1 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
                    <span className="pl-8 text-base font-semibold">{item.day}</span>
                  </div>
                </td>
                <td className="text-sm pl-4 font-medium text-right">{item.percentage}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <ChartContainer config={chartConfig} className="h-[320px] w-[320px] !aspect-auto">
              <PieChart>
                <ChartTooltip
                content={<ChartTooltipContent hideLabel={false} />}
                payload={chartData}
                formatter={(value, name, props) => {
                  return (
                    <span id={name.toString()} className="relative pl-2">
                      <div  className="absolute inset-0 left-0 w-1 rounded-full" style={{ backgroundColor: props.payload.fill }} />
                      {props.payload.day}: {value}%<br />
                      Count: {props.payload.count}
                    </span>
                  )
                }}
                />
                <Pie
                  data={chartData}
                  dataKey="percentage"
                  nameKey="day"
                  innerRadius={!isMobile ? 60 : 40}
                  outerRadius={!isMobile ? 160 : 100}
                />
              </PieChart>
        </ChartContainer>
      </section>
    </GeneralCard>
  )
}
