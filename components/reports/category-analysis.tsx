"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"

const data = [
  { name: "IT Services", value: 18.2, color: "hsl(var(--primary))" },
  { name: "Construction", value: 14.5, color: "hsl(var(--accent))" },
  { name: "Professional Services", value: 8.3, color: "hsl(var(--chart-3))" },
  { name: "Office Supplies", value: 6.1, color: "hsl(var(--chart-4))" },
  { name: "Maintenance", value: 4.2, color: "hsl(var(--chart-5))" },
  { name: "Other", value: 2.0, color: "hsl(var(--muted-foreground))" },
]

export function CategoryAnalysis() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-foreground">Spending by Category</CardTitle>
        <p className="text-sm text-muted-foreground">Total: $53.3M across all categories</p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                }}
                formatter={(value: number) => [`$${value}M`, ""]}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span style={{ color: "hsl(var(--foreground))" }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
