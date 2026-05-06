import { DashboardHeader } from "@/components/dashboard/header"
import { ReportsOverview } from "@/components/reports/reports-overview"
import { SpendingTrends } from "@/components/reports/spending-trends"
import { CategoryAnalysis } from "@/components/reports/category-analysis"
import { VendorAnalytics } from "@/components/reports/vendor-analytics"
import { ReportsList } from "@/components/reports/reports-list"

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-foreground">Reports & Analytics</h2>
          <p className="text-muted-foreground">Detailed insights and exportable procurement reports</p>
        </div>

        <ReportsOverview />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <SpendingTrends />
          <CategoryAnalysis />
        </div>

        <VendorAnalytics />
        <ReportsList />
      </main>
    </div>
  )
}
