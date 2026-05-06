"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"

const data = [
  { name: "BuildRight", value: 12.5, contracts: 8 },
  { name: "TechCore", value: 4.2, contracts: 12 },
  { name: "Digital Systems", value: 2.8, contracts: 15 },
  { name: "DataViz", value: 1.6, contracts: 5 },
  { name: "Creative Agency", value: 1.1, contracts: 6 },
  { name: "SecureNet", value: 0.825, contracts: 3 },
  { name: "Smith & Partners", value: 0.72, contracts: 4 },
  { name: "Office Plus", value: 0.45, contracts: 2 },
]

export function VendorAnalytics() {
  return (
    <Card className="bg-card border-border mb-6">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-foreground">Top Vendors by Spend</CardTitle>
        <p className="text-sm text-muted-foreground">Contract value in millions</p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={true} vertical={false} />
              <XAxis
                type="number"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}M`}
              />
              <YAxis
                type="category"
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={100}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                }}
                formatter={(value: number, name: string, props: { payload: { contracts: number } }) => [
                  `$${value}M (${props.payload.contracts} contracts)`,
                  "Total Value",
                ]}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === 0 ? "hsl(var(--primary))" : "hsl(var(--accent))"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
