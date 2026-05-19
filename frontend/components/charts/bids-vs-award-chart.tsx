"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import {
    Card,
    CardContent,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

// Define the raw tuple type returned from PostgreSQL backend [month, count, amount]
type MonthlyDbTuple = [string, number, number];

// Configure keys and labels for our chart modes
const chartTabs = {
    bids_posted_vs_awards_posted: {
        label: "Bids vs Awards Count",
    },
    total_abc_vs_total_ca: {
        label: "ABC vs Contract Amount",
    },
}

const currencyFormatter = new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
});

export function BidsVsAwardsChart({
    bids_abc_per_month,
    awards_ca_per_month
}: {
    bids_abc_per_month: MonthlyDbTuple[]
    awards_ca_per_month: MonthlyDbTuple[]
}) {
    // 1. Guard hydration errors by rendering only after mounting in browser
    const [isMounted, setIsMounted] = React.useState(false);
    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    // Cleanly map and merge the raw database tuples
    const chartData = React.useMemo(() => {
        if (!bids_abc_per_month || bids_abc_per_month.length === 0) return [];

        return bids_abc_per_month.map((item) => {
            const month = item[0]
            const bids_posted = item[1]
            const total_abc = item[2]

            const awardItem = awards_ca_per_month?.find((a) => a[0] === month)
            const awards_posted = awardItem ? awardItem[1] : 0
            const total_ca = awardItem ? awardItem[2] : 0

            return {
                month,
                bids_posted,
                awards_posted,
                total_abc,
                total_ca,
            }
        })
    }, [bids_abc_per_month, awards_ca_per_month])

    // Debugging logs in browser developer tools
    React.useEffect(() => {
        console.log("Procurement Activity Chart mounted/updated!");
        console.log("chartData:", chartData);
        console.log("bids_abc_per_month input:", bids_abc_per_month);
    }, [chartData, bids_abc_per_month]);

    const [activeChart, setActiveChart] =
        React.useState<keyof typeof chartTabs>("bids_posted_vs_awards_posted")

    // Calculate total sums dynamically
    const total = React.useMemo(
        () => ({
            bids_posted_vs_awards_posted: chartData.reduce((acc, curr) => acc + curr.bids_posted, 0),
            total_abc_vs_total_ca: chartData.reduce((acc, curr) => acc + curr.total_abc, 0),
        }),
        [chartData]
    )

    // Formatter for Y-Axis labels safely checking for null/undefined/NaN values
    const yAxisFormatter = React.useCallback((value: any) => {
        if (value === null || value === undefined || isNaN(value)) return "";
        if (activeChart === "total_abc_vs_total_ca") {
            return `₱${currencyFormatter.format(Number(value))}`;
        }
        return Number(value).toLocaleString();
    }, [activeChart]);

    // Formatter for Tooltip values safely checking for null/undefined/NaN values
    const tooltipFormatter = React.useCallback((value: any, name: any) => {
        if (value === null || value === undefined || isNaN(value)) return ["", name];
        const label = activeChart === "total_abc_vs_total_ca"
            ? `₱${Number(value).toLocaleString()}`
            : Number(value).toLocaleString();
        return [label, name];
    }, [activeChart]);

    if (!isMounted) {
        return (
            <Card className="p-6 bg-card border-border">
                <div className="h-[300px] flex items-center justify-center text-muted-foreground text-sm">
                    <span className="animate-pulse">Loading chart layout...</span>
                </div>
            </Card>
        );
    }

    return (
        <Card className="p-6 bg-card border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">Procurement Activity Overview</h3>
                    <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-primary" />
                            <span className="text-sm text-muted-foreground">Approved Budget</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-accent" />
                            <span className="text-sm text-muted-foreground">Contract Amount</span>
                        </div>
                    </div>
                </div>

                {/* Dynamic ButtonGroup for activeChart selection */}
                <ButtonGroup>
                    {(Object.keys(chartTabs) as Array<keyof typeof chartTabs>).map((key) => {
                        const isActive = activeChart === key
                        return (
                            <Button
                                key={key}
                                variant={isActive ? "secondary" : "outline"}
                                onClick={() => setActiveChart(key)}
                                className="flex flex-col items-start gap-1 py-2 px-4 h-auto text-left hover:bg-secondary hover:text-secondary-foreground"
                            >
                                <span className="text-[10px] tracking-wider text-muted-foreground">
                                    {chartTabs[key].label}
                                </span>
                                {/*<span className="text-lg font-bold leading-none">
                                    {key === "total_abc_vs_total_ca" ? `₱${currencyFormatter.format(total[key])}` : currencyFormatter.format(total[key])}
                                </span>*/}
                            </Button>
                        )
                    })}
                </ButtonGroup>
            </div>

            <CardContent className="px-0 sm:p-4">
                {chartData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[300px] border border-dashed rounded-lg border-muted-foreground/20 text-muted-foreground text-sm">
                        <span>No monthly procurement activity records found.</span>
                    </div>
                ) : (
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={chartData}
                                margin={{
                                    top: 10,
                                    right: 10,
                                    left: 10,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0 0)" vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fill: "oklch(0.6 0 0)", fontSize: 12 }}
                                    tickMargin={8}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "oklch(0.6 0 0)", fontSize: 12 }}
                                    tickFormatter={yAxisFormatter}
                                />
                                <Tooltip
                                    cursor={{ fill: "oklch(0.20 0 0)", strokeDasharray: "3 3" }}
                                    contentStyle={{
                                        backgroundColor: "oklch(0.14 0 0)",
                                        border: "1px solid oklch(0.25 0 0)",
                                        borderRadius: "12px",
                                        color: "oklch(0.95 0 0)",
                                        fontSize: "12px",
                                        margin: "0"
                                    }}
                                    labelFormatter={(month) =>
                                        new Date(`${month} 1, 2000`).toLocaleString("en-US", {
                                            month: "long",
                                        })
                                    }
                                    labelStyle={{
                                        marginBottom: "4px",
                                        fontWeight: "bold",
                                        color: "oklch(0.95 0 0)",
                                    }}
                                    itemStyle={{
                                        padding: "0",
                                        margin: "0"
                                    }}
                                    formatter={(value: number, property: string) => [activeChart === "bids_posted_vs_awards_posted" ? currencyFormatter.format(value) : `₱${currencyFormatter.format(value)}`, property]}
                                />

                                {activeChart === "bids_posted_vs_awards_posted" && (
                                    <Bar
                                        name="Bids Posted"
                                        dataKey="bids_posted"
                                        fill="oklch(0.7 0.15 200)"
                                        radius={[4, 4, 0, 0]}
                                    />
                                )}
                                {activeChart === "bids_posted_vs_awards_posted" && (
                                    <Bar
                                        name="Awards Posted"
                                        dataKey="awards_posted"
                                        fill="oklch(0.75 0.18 145)"
                                        radius={[4, 4, 0, 0]}
                                    />
                                )}
                                {activeChart === "total_abc_vs_total_ca" && (
                                    <Bar
                                        name="Approved Budget"
                                        dataKey="total_abc"
                                        fill="oklch(0.7 0.15 200)"
                                        radius={[4, 4, 0, 0]}
                                    />
                                )}
                                {activeChart === "total_abc_vs_total_ca" && (
                                    <Bar
                                        name="Contract Amount"
                                        dataKey="total_ca"
                                        fill="oklch(0.75 0.18 145)"
                                        radius={[4, 4, 0, 0]}
                                    />
                                )}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
