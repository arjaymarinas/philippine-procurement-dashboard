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


interface MerchantsStats {
    total_active_merchant: number
    total_platinum_merchant: number
}

interface RedPlatinumDataPoint {
    name: string
    value: number
}

const currencyFormatter = new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 2,
});

export function RedPlatinumChart({ merchants }: { merchants: MerchantsStats }) {
    const totalActive = merchants?.total_active_merchant ?? 0;
    const platinum = merchants?.total_platinum_merchant ?? 0;
    const red = Math.max(0, totalActive - platinum);

    const red_platinum_data: RedPlatinumDataPoint[] = [
        { name: "Red Members", value: red },
        { name: "Platinum Members", value: platinum },
    ];

    const COLORS = [
        'oklch(0.7 0.15 200)',   // Red Members (Crimson)
        'oklch(0.75 0.18 145)',  // Platinum Members (Silver/Platinum Blue)
    ];

    // Custom Tooltip component to dynamically color-match the hovered slice
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const item = payload[0];
            return (
                <div
                    className="bg-[oklch(0.14_0_0)] border border-[oklch(0.25_0_0)] p-3 rounded-lg text-xs shadow-md"
                    style={{ color: item.color }}
                >
                    <div className="flex items-center gap-1.5 font-semibold">
                        <span>{item.name}:</span>
                        <span>{currencyFormatter.format(item.value)}</span>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <Card className="p-6 bg-card border-border">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-foreground">Merchant Membership</h3>
                <p className="text-sm text-muted-foreground mt-1">Active Red vs Platinum registered suppliers</p>
            </div>
            <div className="h-[280px] w-full p-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={red_platinum_data}
                            cx="50%"
                            cy="50%"
                            innerRadius={65}
                            outerRadius={100}
                            paddingAngle={3}
                            dataKey="value"
                            nameKey="name"
                        >
                            {red_platinum_data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "oklch(0.14 0 0)",
                                border: "1px solid oklch(0.25 0 0)",
                                borderRadius: "8px",
                                color: "oklch(0.7 0.15 200)",
                                fontSize: "12px",
                            }}
                            itemStyle={{
                                color: "oklch(0.95 0 0)"
                            }}
                            formatter={(value: number) => [currencyFormatter.format(value), "Merchants"]}
                        />
                        <Legend
                            verticalAlign="bottom"
                            formatter={(value) => <span style={{ color: "oklch(0.95 0 0)" }}>{value}</span>}
                            wrapperStyle={{ fontSize: '12px' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}
