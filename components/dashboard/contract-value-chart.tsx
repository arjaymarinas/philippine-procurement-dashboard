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

const data = [
  { month: "Jan", value: 2.4 },
  { month: "Feb", value: 3.1 },
  { month: "Mar", value: 2.8 },
  { month: "Apr", value: 3.5 },
  { month: "May", value: 4.2 },
  { month: "Jun", value: 3.9 },
  { month: "Jul", value: 4.8 },
  { month: "Aug", value: 5.2 },
  { month: "Sep", value: 4.6 },
  { month: "Oct", value: 5.8 },
  { month: "Nov", value: 6.1 },
  { month: "Dec", value: 6.9 },
]

export function ContractValueChart() {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Contract Values</h3>
          <p className="text-sm text-muted-foreground mt-1">Monthly awarded contract amounts (in millions)</p>
        </div>
        <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          View Details
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
              tickFormatter={(value) => `$${value}M`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.14 0 0)",
                border: "1px solid oklch(0.25 0 0)",
                borderRadius: "8px",
                color: "oklch(0.95 0 0)",
              }}
              formatter={(value: number) => [`$${value}M`, "Contract Value"]}
            />
            <Bar
              dataKey="value"
              fill="oklch(0.7 0.15 200)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
