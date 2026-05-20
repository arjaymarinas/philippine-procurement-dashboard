"use client"

import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { StatCard } from "@/components/dashboard/stat-card"
import { ActivityChart } from "@/components/dashboard/activity-chart"
import { ContractValueChart } from "@/components/dashboard/contract-value-chart"
import { CategoryBreakdown } from "@/components/dashboard/category-breakdown"
import { RecentActivities } from "@/components/dashboard/recent-activities"
import { VendorPerformance } from "@/components/dashboard/vendor-performance"
import { ProcurementPieChart } from "@/components/dashboard/pie-chart"
import { BudgetVsActualChart } from "@/components/dashboard/budget-actual-chart"
import { BidsVsAwardsChart } from "@/components/charts/bids-vs-award-chart"
import { RedPlatinumChart } from "@/components/charts/red-platinum-chart"
import { DashboardProvider, useDashboard } from "@/hooks/use-dashboard-stats"

import {
  FileText,
  DollarSign,
  Users,
  TrendingUp,
  Clock,
  Award,
} from "lucide-react"

function DashboardContent() {
  const { selectedYear } = useDashboard()

  const currencyFormatter = new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
  });

  const [stats, setStats] = useState(null)

  useEffect(() => {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

    fetch(`${apiUrl}/dashboard?year=${selectedYear}`)
      .then((res) => res.json())
      .then((data) => {
        setStats(data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [selectedYear])

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <StatCard
            title="Bids Posted"
            value={currencyFormatter.format(stats?.bids?.bid_posted ?? 0)}
            change={10.2}
            changeLabel="vs last year"
            icon={<FileText className="h-4 w-4" />}
          />
          <StatCard
            title="Total ABC"
            value={currencyFormatter.format(stats?.bids?.total_abc ?? 0)}
            prefix="₱"
            change={14.5}
            changeLabel="vs last year"
            icon={<DollarSign className="h-4 w-4" />}
          />
          <StatCard
            title="Awards Posted"
            value={currencyFormatter.format(stats?.awards?.award_posted ?? 0)}
            change={10.2}
            changeLabel="vs last year"
            icon={<FileText className="h-4 w-4" />}
          />
          <StatCard
            title="Contract Amount"
            value={currencyFormatter.format(stats?.awards?.total_contract_amount ?? 0)}
            prefix="₱"
            change={14.5}
            changeLabel="vs last year"
            icon={<DollarSign className="h-4 w-4" />}
          />
          <StatCard
            title="Merchants Registration"
            value={currencyFormatter.format(stats?.merchant_stats?.total_registration ?? 0)}
            change={8.3}
            changeLabel="vs last year"
            icon={<Users className="h-4 w-4" />}
          />
          <StatCard
            title="Agency Registrations"
            value={currencyFormatter.format(stats?.agency_stats?.total_agencies ?? 0)}
            change={8.3}
            changeLabel="vs last year"
            icon={<Award className="h-4 w-4" />}
          />
        </div>

        {/* Pie Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <RedPlatinumChart merchants={stats?.merchant_stats} />
          <div className="lg:col-span-2">
            <BidsVsAwardsChart bids_abc_per_month={stats?.bids_abc_per_month} awards_ca_per_month={stats?.awards_ca_per_month} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <ProcurementPieChart bids_abc_by_classification={stats?.bids_abc_by_classification} />
          <div className="lg:col-span-2">
            <BudgetVsActualChart bids_abc_per_month={stats?.bids_abc_per_month} awards_ca_per_month={stats?.awards_ca_per_month} />
          </div>
        </div>

        {/* Vendor Performance */}
        <div className="mt-6">
          <VendorPerformance top_10_merchants_by_ca={stats?.top_10_merchants_by_ca} />
        </div>

        {/* Bar Chart */}
        <div className="mt-6">
          <BidsVsAwardsChart bids_abc_per_month={stats?.bids_abc_per_month} awards_ca_per_month={stats?.awards_ca_per_month} />
        </div>
      </main>
    </div>
  )
}

export default function ProcurementDashboard() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  )
}
