import { Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const daysData = [
  { day: "Lunes", percentage: "14.2%", color: "#8B5CF6" },
  { day: "Martes", percentage: "14.2%", color: "#A78BFA" },
  { day: "Miércoles", percentage: "14.2%", color: "#C4B5FD" },
  { day: "Jueves", percentage: "14.2%", color: "#DDD6FE" },
  { day: "Viernes", percentage: "14.2%", color: "#EDE9FE" },
  { day: "Sábado", percentage: "14.2%", color: "#F3F4F6" },
  { day: "Domingo", percentage: "14.2%", color: "#E5E7EB" },
]

export function ChartSection() {
  return (
    <Card className="bg-gray-50 border-0">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-lg">Días en los que más retiros se realizan</h3>
        </div>

        <div className="flex gap-12">
          {/* Legend */}
          <div className="space-y-4">
            <div className="flex items-center gap-16 text-sm font-medium">
              <span>Día</span>
              <span>%</span>
            </div>
            {daysData.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex items-center gap-3 w-24">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">{item.day}</span>
                </div>
                <span className="text-sm font-medium ml-8">{item.percentage}</span>
              </div>
            ))}
          </div>

          {/* Donut Chart */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-80 h-80">
              <svg width="320" height="320" className="transform -rotate-90">
                <circle
                  cx="160"
                  cy="160"
                  r="100"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="40"
                  strokeDasharray="89.5 628"
                  strokeDashoffset="0"
                />
                <circle
                  cx="160"
                  cy="160"
                  r="100"
                  fill="none"
                  stroke="#A78BFA"
                  strokeWidth="40"
                  strokeDasharray="89.5 628"
                  strokeDashoffset="-89.5"
                />
                <circle
                  cx="160"
                  cy="160"
                  r="100"
                  fill="none"
                  stroke="#C4B5FD"
                  strokeWidth="40"
                  strokeDasharray="89.5 628"
                  strokeDashoffset="-179"
                />
                <circle
                  cx="160"
                  cy="160"
                  r="100"
                  fill="none"
                  stroke="#DDD6FE"
                  strokeWidth="40"
                  strokeDasharray="89.5 628"
                  strokeDashoffset="-268.5"
                />
                <circle
                  cx="160"
                  cy="160"
                  r="100"
                  fill="none"
                  stroke="#EDE9FE"
                  strokeWidth="40"
                  strokeDasharray="89.5 628"
                  strokeDashoffset="-358"
                />
                <circle
                  cx="160"
                  cy="160"
                  r="100"
                  fill="none"
                  stroke="#F3F4F6"
                  strokeWidth="40"
                  strokeDasharray="89.5 628"
                  strokeDashoffset="-447.5"
                />
                <circle
                  cx="160"
                  cy="160"
                  r="100"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="40"
                  strokeDasharray="89.5 628"
                  strokeDashoffset="-537"
                />
              </svg>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
