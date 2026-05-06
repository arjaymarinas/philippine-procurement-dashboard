"use client"

import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { StatCard } from "@/components/dashboard/stat-card"
import { ActivityChart } from "@/components/dashboard/activity-chart"
import { ContractValueChart } from "@/components/dashboard/contract-value-chart"
import { CategoryBreakdown } from "@/components/dashboard/category-breakdown"
import { RecentActivities } from "@/components/dashboard/recent-activities"
import { VendorPerformance } from "@/components/dashboard/vendor-performance"
import {
  FileText,
  DollarSign,
  Users,
  TrendingUp,
  Clock,
  Award,
} from "lucide-react"

export default function ProcurementDashboard() {
  const [suppliers, setSuppliers] = useState([])

  useEffect(() => {
    fetch("http://localhost:8000/suppliers")
      .then((res) => res.json())
      .then((data) => setSuppliers(data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <StatCard
            title="Total Bids"
            value={927}
            change={10.2}
            changeLabel="vs last year"
            icon={<FileText className="h-4 w-4" />}
          />
          <StatCard
            title="Contract Value"
            value="53.3"
            prefix="₱"
            suffix="M"
            change={14.5}
            changeLabel="vs last year"
            icon={<DollarSign className="h-4 w-4" />}
          />
          <StatCard
            title="Active Vendors"
            value={suppliers.length}
            change={8.3}
            changeLabel="vs last year"
            icon={<Users className="h-4 w-4" />}
          />
          <StatCard
            title="Avg Bid Value"
            value="57.5"
            prefix="₱"
            suffix="K"
            change={6.1}
            changeLabel="vs last year"
            icon={<TrendingUp className="h-4 w-4" />}
          />
          <StatCard
            title="Avg Cycle Time"
            value="18.5"
            suffix=" days"
            change={-12.4}
            changeLabel="vs last year"
            icon={<Clock className="h-4 w-4" />}
          />
          <StatCard
            title="Awards Made"
            value={685}
            change={9.8}
            changeLabel="vs last year"
            icon={<Award className="h-4 w-4" />}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ActivityChart />
          <ContractValueChart />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CategoryBreakdown />
          <div className="lg:col-span-2">
            <RecentActivities />
          </div>
        </div>

        {/* Vendor Performance */}
        <div className="mt-6">
          <VendorPerformance />
        </div>
      </main>
    </div>
  )
}
