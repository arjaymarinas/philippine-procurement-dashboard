"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

interface DashboardContextType {
  selectedYear: string
  setSelectedYear: (year: string) => void
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [selectedYear, setSelectedYear] = useState("2025")

  return (
    <DashboardContext.Provider value={{ selectedYear, setSelectedYear }}>
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider")
  }
  return context
}
