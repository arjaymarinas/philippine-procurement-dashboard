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


interface ClassificationData {
    classification: string;
    bid_value: number;
    abc_value: number;
}

const currencyFormatter = new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 2,
});

export function ProcurementPieChart({ bids_abc_by_classification }: { bids_abc_by_classification: any[][] }) {
    const pieData: ClassificationData[] = bids_abc_by_classification?.map((item: any) => {
        return {
            classification: item[0] === "Goods - General Support Services" ? "Goods - GSS" : item[0],
            bid_value: item[1],
            abc_value: item[2]
        }
    }) || [];

    const totalValue = pieData.reduce((acc, curr) => acc + curr.abc_value, 0);

    console.log(pieData);

    const COLORS = [
        'oklch(0.7 0.15 200)',   // Goods
        'oklch(0.75 0.18 145)',  // Services
        'oklch(0.8 0.1 60)',     // Works
        'oklch(0.85 0.18 95)',   // Consulting
        'oklch(0.95 0 0)'        // Remaining
    ];

    return (
        <Card className="p-6 bg-card border-border">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-foreground">Distribution of Procurement by Classification</h3>
                <p className="text-sm text-muted-foreground mt-1">Approved Budget for the Contract</p>
            </div>
            <div className="h-[280px] w-full p-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={65}
                            outerRadius={100}
                            paddingAngle={2}
                            dataKey="abc_value"
                            nameKey="classification"
                        >
                            {pieData.map((entry: ClassificationData, index: number) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "oklch(0.14 0 0)",
                                border: "1px solid oklch(0.25 0 0)",
                                borderRadius: "8px",
                                color: "oklch(1 0 0)",
                                fontSize: "12px",
                            }}
                            itemStyle={{ color: "oklch(1 0 0)" }}
                            labelStyle={{ color: "oklch(1 0 0)" }}
                            formatter={(abc: number, classification: string) => {
                                const percentage = totalValue > 0 ? ((abc / totalValue) * 100).toFixed(1) : 0;
                                return [`₱${currencyFormatter.format(abc)} (${percentage}%)`, classification];
                            }}
                        />
                        <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: '12px' }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}
