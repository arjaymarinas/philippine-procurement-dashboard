"use client"

import { Card } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { ChevronRight } from "lucide-react"


export function ActivityChart({ bids_per_month, awards_per_month }: { bids_per_month: any, awards_per_month: any }) {
  const chartData = bids_per_month?.map((item: any) => {
    const month = item[0]
    const bids = item[1]
    const awardItem = awards_per_month?.find((a: any) => a[0] === month)
    const award = awardItem ? awardItem[1] : 0

    return {
      month,
      bids_posted: bids,
      award_posted: award
    }
  }) || []

  const numberFormatter = new Intl.NumberFormat("en-US")

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Procurement Activity</h3>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">Bids Posted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-accent" />
              <span className="text-sm text-muted-foreground">Contracts Awarded</span>
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
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBids" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.7 0.15 200)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="oklch(0.7 0.15 200)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorContracts" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.75 0.18 145)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="oklch(0.75 0.18 145)" stopOpacity={0} />
              </linearGradient>
            </defs>
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
              tickFormatter={(value) => numberFormatter.format(value)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.14 0 0)",
                border: "1px solid oklch(0.25 0 0)",
                borderRadius: "8px",
                color: "oklch(0.95 0 0)",
              }}
              formatter={(value: number) => [numberFormatter.format(value)]}
            />
            <Area
              type="monotone"
              dataKey="bids_posted"
              name="Bids Posted"
              stroke="oklch(0.7 0.15 200)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorBids)"
            />
            <Area
              type="monotone"
              dataKey="award_posted"
              name="Contracts Awarded"
              stroke="oklch(0.75 0.18 145)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorContracts)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
