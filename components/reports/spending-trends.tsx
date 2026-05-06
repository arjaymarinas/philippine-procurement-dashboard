"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const data = [
  { month: "Jan", current: 4.2, previous: 3.8 },
  { month: "Feb", current: 3.8, previous: 3.5 },
  { month: "Mar", current: 5.1, previous: 4.2 },
  { month: "Apr", current: 4.6, previous: 4.0 },
  { month: "May", current: 5.8, previous: 4.8 },
  { month: "Jun", current: 4.9, previous: 4.5 },
  { month: "Jul", current: 5.2, previous: 4.6 },
  { month: "Aug", current: 4.5, previous: 4.1 },
  { month: "Sep", current: 5.6, previous: 4.9 },
  { month: "Oct", current: 4.8, previous: 4.3 },
  { month: "Nov", current: 5.3, previous: 4.7 },
  { month: "Dec", current: 4.5, previous: 4.1 },
]

export function SpendingTrends() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-foreground">Spending Trends</CardTitle>
        <p className="text-sm text-muted-foreground">Year-over-year comparison (in millions)</p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}M`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                }}
                formatter={(value: number) => [`$${value}M`, ""]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="current"
                name="FY 2025"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "hsl(var(--primary))" }}
              />
              <Line
                type="monotone"
                dataKey="previous"
                name="FY 2024"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                activeDot={{ r: 4, fill: "hsl(var(--muted-foreground))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
