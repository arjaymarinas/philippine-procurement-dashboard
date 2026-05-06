import { DashboardHeader } from "@/components/dashboard/header"
import { VendorsStats } from "@/components/vendors/vendors-stats"
import { VendorsFilters } from "@/components/vendors/vendors-filters"
import { VendorsDirectory } from "@/components/vendors/vendors-directory"

export default function VendorsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-foreground">Vendor Directory</h2>
          <p className="text-muted-foreground">Manage vendor relationships and performance</p>
        </div>

        <VendorsStats />
        <VendorsFilters />
        <VendorsDirectory />
      </main>
    </div>
  )
}
