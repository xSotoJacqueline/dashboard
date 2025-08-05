"use client"

import { Sidebar } from "@/components/Retiros/Sidebar"
import { MetricsCards } from "@/components/Retiros/MetricsCards"
import { ChartSection } from "@/components/Retiros/ChartSection"
import { PlayersSection } from "@/components/Retiros/PlayersSection"
import { PeakHoursSection } from "@/components/Retiros/PeakHoursSection"

export default function Retiros() {
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
