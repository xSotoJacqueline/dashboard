"use client"

import { useState } from "react"
import { Sidebar } from "@/components/Retiros/Sidebar"
import { MetricsCards } from "@/components/Retiros/MetricsCards"
import { ChartSection } from "@/components/Retiros/ChartSection"
import { PlayersSection } from "@/components/Retiros/PlayersSection"
import { PeakHoursSection } from "@/components/Retiros/PeakHoursSection"

export default function Retiros() {
  const [currentMonth, setCurrentMonth] = useState(6) // July (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025)

  const navigateMonth = (direction: "prev" | "next") => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11)
        setCurrentYear(currentYear - 1)
      } else {
        setCurrentMonth(currentMonth - 1)
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0)
        setCurrentYear(currentYear + 1)
      } else {
        setCurrentMonth(currentMonth + 1)
      }
    }
  }

  return (
    <div >
      <div className="p-4">

        <div className="bg-white rounded-lg text-black min-h-[800px] relative">
          <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-6">
              <MetricsCards />
              <ChartSection />
            </div>

            {/* Right Sidebar */}
            <div className="w-80 p-6 space-y-6">
              <PlayersSection />
              <PeakHoursSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
