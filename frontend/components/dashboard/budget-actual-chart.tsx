"use client"

import { Card } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { ChevronRight } from "lucide-react"

interface BudgetVsActualChartProps {
  month: string;
  abc_value: number;
  contract_value: number;
}

const currencyFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 2,
});

export function BudgetVsActualChart({ bids_abc_per_month, awards_ca_per_month }: { bids_abc_per_month: BudgetVsActualChartProps[], awards_ca_per_month: BudgetVsActualChartProps[] }) {
  const chartData = bids_abc_per_month?.map((item: any) => {
    const month = item[0]
    const abc = item[2]
    const awardItem = awards_ca_per_month?.find((a: any) => a[0] === month)
    const ca = awardItem ? awardItem[2] : 0

    return {
      month,
      "Approved Budget": abc,
      "Contract Amount": ca
    }
  }) || [];

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Monthly Approved Budget vs Contract Amount</h3>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">Contract Amount</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-accent" />
              <span className="text-sm text-muted-foreground">Approved Budget</span>
            </div>
          </div>
        </div>
        <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          View Details
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0 0)" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "oklch(0.6 0 0)", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "oklch(0.6 0 0)", fontSize: 12 }}
              tickFormatter={(value) => `₱${currencyFormatter.format(value)}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.14 0 0)",
                border: "1px solid oklch(0.25 0 0)",
                borderRadius: "8px",
                color: "oklch(0.95 0 0)",
              }}
              formatter={(value: number, property: string) => [`₱${currencyFormatter.format(value)}`, property]}
            />
            <Bar
              dataKey="Approved Budget"
              fill="oklch(0.7 0.15 200)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="Contract Amount"
              fill="oklch(0.75 0.18 145)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
