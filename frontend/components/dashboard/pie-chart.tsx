"use client"

import { Card } from "@/components/ui/card"
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

const TOTAL_GAA = 5.768; // ₱5.768 Trillion
const goods = 1.2;
const services = 0.8;
const works = 1.5;
const consulting = 0.2;
const remaining = TOTAL_GAA - (goods + services + works + consulting);

const data = [
    { name: 'Goods', value: goods },
    { name: 'Services', value: services },
    { name: 'Works', value: works },
    { name: 'Consulting', value: consulting },
    { name: 'Remaining GAA', value: parseFloat(remaining.toFixed(3)) },
];

const COLORS = [
    'oklch(0.7 0.15 200)',   // Goods
    'oklch(0.75 0.18 145)',  // Services
    'oklch(0.8 0.1 60)',     // Works
    'oklch(0.85 0.18 95)',   // Consulting
    'oklch(0.95 0 0)'        // Remaining
];

export function ProcurementPieChart() {
    return (
        <Card className="p-6 bg-card border-border">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-foreground">FY 2024 GAA Utilization</h3>
                <p className="text-sm text-muted-foreground mt-1">Budget breakdown vs. utilized procurement (in Trillions)</p>
            </div>
            <div className="h-[280px] w-full p-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={65}
                            outerRadius={100}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                border: "1px solid oklch(0.25 0 0)",
                                borderRadius: "8px",
                                color: "oklch(0.95 0 0)",
                                fontSize: "12px",
                            }}
                            formatter={(value: number) => [`₱${value.toFixed(2)}T`, "Amount"]}
                        />
                        <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: '12px' }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}
