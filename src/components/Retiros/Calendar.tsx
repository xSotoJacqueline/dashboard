
import { useState } from "react"

const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
]
const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

export function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(6) // July (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025)

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const renderCalendar = (month: number, year: number) => {
    const daysInMonth = getDaysInMonth(month, year)
    const firstDay = getFirstDayOfMonth(month, year)
    const days = []

    // Previous month's trailing days
    const prevMonth = month === 0 ? 11 : month - 1
    const prevYear = month === 0 ? year - 1 : year
    const daysInPrevMonth = getDaysInMonth(prevMonth, prevYear)

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div
          key={`prev-${daysInPrevMonth - i}`}
          className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm"
        >
          {daysInPrevMonth - i}
        </div>,
      )
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = day === 13 && month === 6 // July 13th selected
      days.push(
        <div
          key={day}
          className={`w-8 h-8 flex items-center justify-center text-sm cursor-pointer hover:bg-purple-100 ${
            isSelected ? "bg-purple-600 text-white rounded-full" : ""
          }`}
        >
          {day}
        </div>,
      )
    }

    // Next month's leading days
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7
    const remainingCells = totalCells - (firstDay + daysInMonth)

    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <div key={`next-${day}`} className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm">
          {day}
        </div>,
      )
    }

    return days
  }

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
    <div className="mb-8 border border-blue-400 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => navigateMonth("prev")} className="p-1 hover:bg-gray-200 rounded">
          ←
        </button>
        <span className="font-medium">
          {monthNames[currentMonth]} {currentYear}
        </span>
        <button onClick={() => navigateMonth("next")} className="p-1 hover:bg-gray-200 rounded">
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-xs text-center font-medium text-gray-500 p-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 mb-6">{renderCalendar(currentMonth, currentYear)}</div>

      {/* Next month preview */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <button className="p-1 hover:bg-gray-200 rounded">←</button>
          <span className="font-medium text-sm">
            {monthNames[currentMonth === 11 ? 0 : currentMonth + 1]}{" "}
            {currentMonth === 11 ? currentYear + 1 : currentYear}
          </span>
          <button className="p-1 hover:bg-gray-200 rounded">→</button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="text-xs text-center font-medium text-gray-500 p-1">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {renderCalendar(
            currentMonth === 11 ? 0 : currentMonth + 1,
            currentMonth === 11 ? currentYear + 1 : currentYear,
          )}
        </div>
      </div>
    </div>
  )
}
