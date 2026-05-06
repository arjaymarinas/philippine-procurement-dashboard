"use client"

import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronRight, Star } from "lucide-react"
import { useVendors, formatCurrency } from "@/hooks/use-procurement-data"

export function VendorPerformance() {
  const { vendors, isLoading, isError } = useVendors()

  // Sort by total value and get top 5
  const topVendors = [...vendors]
    .sort((a, b) => b.totalValue - a.totalValue)
    .slice(0, 5)
    .map(vendor => ({
      ...vendor,
      rating: (4 + Math.random() * 0.9).toFixed(1), // Simulated rating between 4.0-4.9
      onTime: Math.floor(85 + Math.random() * 15), // Simulated on-time % between 85-100
    }))

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Top Vendors</h3>
          <p className="text-sm text-muted-foreground mt-1">By contract value this year</p>
        </div>
        <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          View All
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between py-3">
              <Skeleton className="h-4 w-40" />
              <div className="flex gap-8">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>Failed to load vendors. Make sure the backend is running.</p>
        </div>
      ) : topVendors.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No vendor data available.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">
                  Vendor
                </th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">
                  Contracts
                </th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3 hidden sm:table-cell">
                  Value
                </th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3 hidden md:table-cell">
                  On-Time %
                </th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {topVendors.map((vendor) => (
                <tr
                  key={vendor.name}
                  className="hover:bg-secondary/30 transition-colors cursor-pointer"
                >
                  <td className="py-3">
                    <span className="text-sm font-medium text-foreground">
                      {vendor.name}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <span className="text-sm text-muted-foreground">
                      {vendor.totalContracts}
                    </span>
                  </td>
                  <td className="py-3 text-right hidden sm:table-cell">
                    <span className="text-sm text-foreground font-medium">
                      {formatCurrency(vendor.totalValue)}
                    </span>
                  </td>
                  <td className="py-3 text-right hidden md:table-cell">
                    <span
                      className={`text-sm font-medium ${
                        vendor.onTime >= 95
                          ? "text-accent"
                          : vendor.onTime >= 90
                          ? "text-chart-3"
                          : "text-chart-4"
                      }`}
                    >
                      {vendor.onTime}%
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Star className="h-4 w-4 fill-chart-3 text-chart-3" />
                      <span className="text-sm font-medium text-foreground">
                        {vendor.rating}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  )
}
