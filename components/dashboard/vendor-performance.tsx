"use client"

import { Card } from "@/components/ui/card"
import { ChevronRight, Star } from "lucide-react"

const vendors = [
  { name: "TechCorp Solutions", contracts: 12, value: "$8.5M", rating: 4.8, onTime: 98 },
  { name: "BuildRight Construction", contracts: 8, value: "$6.2M", rating: 4.6, onTime: 95 },
  { name: "SecureNet Services", contracts: 6, value: "$4.1M", rating: 4.9, onTime: 100 },
  { name: "CloudFirst Inc", contracts: 5, value: "$3.8M", rating: 4.5, onTime: 92 },
  { name: "ProSupply Co", contracts: 9, value: "$2.9M", rating: 4.4, onTime: 89 },
]

export function VendorPerformance() {
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
            {vendors.map((vendor) => (
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
                    {vendor.contracts}
                  </span>
                </td>
                <td className="py-3 text-right hidden sm:table-cell">
                  <span className="text-sm text-foreground font-medium">
                    {vendor.value}
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
    </Card>
  )
}
