import { Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Pie, PieChart } from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useIsMobile } from "@/hooks/use-mobile"

const chartData = [
  { day: "lunes", visitors: 14.5, fill: "var(--lunes)" },
  { day: "martes", visitors: 14.5, fill: "var(--martes)" },
  { day: "miércoles", visitors: 14.5, fill: "var(--miercoles)" },
  { day: "jueves", visitors: 14.5, fill: "var(--jueves)" },
  { day: "viernes", visitors: 14.5, fill: "var(--viernes)" },
  { day: "sábado", visitors: 14.5, fill: "var(--sabado)" },
  { day: "domingo", visitors: 14.5, fill: "var(--domingo)" },
]
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  lunes: {
    label: "lunes",
    color: "var(--lunes)",
  },
  martes: {
    label: "martes",
    color: "var(--martes)",
  },
  miercoles: {
    label: "miércoles",
    color: "var(--miercoles)",
  },
  jueves: {
    label: "jueves",
    color: "var(--jueves)",
  },
  viernes: {
    label: "viernes",
    color: "var(--viernes)",
  },
  sabado: {
    label: "sábado",
    color: "var(--sabado)",
  },
  domingo: {
    label: "domingo",
    color: "var(--domingo)",
  },
} satisfies ChartConfig


export function ChartSection() {
  const isMobile = useIsMobile()
  
  console.log('isMobile', isMobile)

  return (
    <Card className="bg-gray-50 h-full border-0">
      <CardContent className=" w-full">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-5 h-5 text-primary-folatti" />
          <h3 className="font-semibold text-lg">Días en los que más retiros se realizan</h3>
        </div>

        <div className="flex lg:flex-row relative flex-col justify-between w-full min-h-80 h-fit">
          {/* Legend */}
          <div className="w-full h-full max-w-xs">
            <table className="w-full h-full">
              <thead>
              <tr className="text-left text-lg font-bold text-primary-folatti">
                <th className="flex justify-center">Día</th>
                <th className="pr-2 text-right">%</th>
              </tr>
              </thead>
              <tbody>
              {chartData.map((item, index) => (
                <tr key={index} className="h-9">
                  <td className="align-middle">
                    <div className="flex relative items-center gap-3 justify-center">
                      <div className="w-3 absolute left-1 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
                      <span className="text-base font-semibold">{item.day}</span>
                    </div>
                  </td>
                  <td className="text-sm font-medium text-right">{item.visitors}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>

          <div className="flex-1 min-h-56 min-w-96 right-0 flex overflow-visible  justify-end w-fit">
          </div>

          {/* Donut Chart */}
            <div className="flex-1 absolute h-56 w-56 md:min-h-96 sm:min-w-96 left-1/2 -translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2 lg:left-auto lg:translate-x-0 bottom-0 lg:right-0 flex overflow-visible justify-end">
            <ChartContainer
              config={chartConfig}
              className=" max-h-[500px] overflow-visible w-full max-w-96"
            >
              <PieChart className=" !w-fit ">
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="visitors"
                  nameKey="day"
                  innerRadius={!isMobile ? 80 : 40}
                  outerRadius={!isMobile ? 180 : 100}
                />
              </PieChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
