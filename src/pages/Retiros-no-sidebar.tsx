
// import { useState } from "react"
import { ChartSection } from "@/components/Retiros/ChartSectionVariant"
import { PlayersSection } from "@/components/Retiros/PlayersSection"
import { PeakHoursSection } from "@/components/Retiros/PeakHoursSection"
import { MetricsCardsVariant } from "@/components/Retiros/MetricsCardsVariant"

export default function Retiros() {
  // const [currentMonth, setCurrentMonth] = useState(6) // July (0-indexed)
  // const [currentYear, setCurrentYear] = useState(2025)

  // const navigateMonth = (direction: "prev" | "next") => {
  //   if (direction === "prev") {
  //     if (currentMonth === 0) {
  //       setCurrentMonth(11)
  //       setCurrentYear(currentYear - 1)
  //     } else {
  //       setCurrentMonth(currentMonth - 1)
  //     }
  //   } else {
  //     if (currentMonth === 11) {
  //       setCurrentMonth(0)
  //       setCurrentYear(currentYear + 1)
  //     } else {
  //       setCurrentMonth(currentMonth + 1)
  //     }
  //   }
  // }

  return (
    <div className="w-full rounded-lg text-black h-full">
          
        <div className="flex flex-col h-full xl:flex-row justify-between gap-6 ">
          {/* Main Content */}
          <div className="w-full flex flex-col gap- justify-between">
            <div className="grid  w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 mb-8">
              <MetricsCardsVariant className="col-span-1" value={Math.floor(Math.random() * 100) + 1} />
              <MetricsCardsVariant className="col-span-1" value={Math.floor(Math.random() * 100) + 1} />
              <MetricsCardsVariant className="cols md:col-span-2 lg:col-span-1" value={Math.floor(Math.random() * 100) + 1} />
            </div>
            <ChartSection />
          </div>

          {/* Right Sidebar */}
          <div className="w-full xl:w-80 bg-amber-400 h-full flex flex-col gap-6  justify-between">
            <PlayersSection />
            <PeakHoursSection />
          </div>
        </div>
    </div>
  )
}
