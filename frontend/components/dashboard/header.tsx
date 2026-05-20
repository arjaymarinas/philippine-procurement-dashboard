"use client"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar, Download, Bell, Settings, LayoutGrid } from "lucide-react"
import { Navigation } from "./navigation"
import { useDashboard } from "@/hooks/use-dashboard-stats"
import Link from "next/link"

export function DashboardHeader() {
  const { selectedYear, setSelectedYear } = useDashboard()

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <LayoutGrid className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Procurement Dashboard</h1>
              <p className="text-sm text-muted-foreground">Overview and analytics</p>
            </div>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[130px] bg-secondary border-border">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">FY 2025</SelectItem>
                <SelectItem value="2024">FY 2024</SelectItem>
                <SelectItem value="2023">FY 2023</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" className="border-border bg-secondary">
              <Download className="h-4 w-4" />
              <span className="sr-only">Export</span>
            </Button>
            <Button variant="outline" size="icon" className="border-border bg-secondary hidden sm:flex">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="outline" size="icon" className="border-border bg-secondary hidden sm:flex">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
          </div>
        </div>
      </div>
      <Navigation />
    </header>
  )
}
