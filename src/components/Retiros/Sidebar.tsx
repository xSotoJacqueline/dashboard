"use client"

import { useState } from "react"
import { BarChart3, Users, Gift, CreditCard, BookOpen, TrendingUp, Target, CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth, useUser } from "@clerk/clerk-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Calendar } from "./Calendar"
import { useEffect } from "react";

const menuItems = [
  { icon: BarChart3, label: "Retiros", active: true },
  { icon: TrendingUp, label: "Métricas" },
  { icon: Target, label: "Marketing" },
  { icon: Users, label: "Jugadores" },
  { icon: Gift, label: "Bonos" },
  { icon: CreditCard, label: "Depósitos" },
  { icon: BookOpen, label: "Sportsbook" },
  { icon: TrendingUp, label: "Alcances" },
  { icon: BarChart3, label: "Benchmark" },

]

export function Sidebar() {
  const [showCalendar, setShowCalendar] = useState(false)
  const { isSignedIn } = useAuth();
  const { user } = useUser();

   useEffect(() => {
    if (isSignedIn && user) {
      // Enviar los datos del usuario al backend
      fetch("/api/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          name: user.fullName,
        }),
      });
    }
  }, [isSignedIn, user]);


  return (
    <div className="w-72 bg-gray-50 p-6">
      <h2 className="font-semibold text-xl mb-6">Menú</h2>

      <nav className="space-y-1 mb-8">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 py-3 px-3 cursor-pointer relative ${
              item.active ? "border-l-4 border-purple-600" : ""
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-base">{item.label}</span>
          </div>
        ))}
      </nav>

      {/* Calendar Section */}
      {showCalendar && <Calendar />}

      {/* Filter Period */}
      <div className="mb-8">
        <h3 className="font-medium mb-3">Filtrar período</h3>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal h-10 bg-transparent"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span className="text-sm">13 Julio 2025 - 14 Agosto 2025</span>
        </Button>
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-3">
        <SignedOut>
          <Button variant="default" asChild className="w-full bg">
            <SignInButton />
          </Button>
              </SignedOut>
              <SignedIn>
          <UserButton />
      </SignedIn>

      </div>
    </div>
  )
}