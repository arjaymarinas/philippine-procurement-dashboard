"use client"

import { Card } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

interface Top10MerchantsByCAProps {
  organization_name: string;
  contracts_awarded: number;
  total_contract_amount: number;
}

export function VendorPerformance({ top_10_merchants_by_ca }: { top_10_merchants_by_ca: Top10MerchantsByCAProps[] }) {
  const currencyFormatter = new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 2,
  });

  const tableData = top_10_merchants_by_ca?.map((merchant: any) => {
    return {
      organization_name: merchant[0],
      contracts_awarded: merchant[1],
      total_contract_amount: merchant[2],
    }
  }) || [];

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
                # Rank
              </th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">
                Vendor
              </th>
              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">
                Contracts
              </th>
              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3 hidden sm:table-cell">
                Value
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {tableData.map((vendor, index) => (
              <tr
                key={vendor.organization_name}
                className="hover:bg-secondary/30 transition-colors cursor-pointer"
              >
                <td className="py-3">
                  <span className="text-sm font-medium text-foreground">
                    {index + 1}
                  </span>
                </td>
                <td className="py-3">
                  <span className="text-sm font-medium text-foreground">
                    {vendor.organization_name}
                  </span>
                </td>
                <td className="py-3 text-right">
                  <span className="text-sm text-muted-foreground">
                    {vendor.contracts_awarded}
                  </span>
                </td>
                <td className="py-3 text-right hidden sm:table-cell">
                  <span className="text-sm text-foreground font-medium">
                    {currencyFormatter.format(vendor.total_contract_amount)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
