"use client"

import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { StatCard } from "@/components/dashboard/stat-card"
import { ActivityChart } from "@/components/dashboard/activity-chart"
import { ContractValueChart } from "@/components/dashboard/contract-value-chart"
import { CategoryBreakdown } from "@/components/dashboard/category-breakdown"
import { RecentActivities } from "@/components/dashboard/recent-activities"
import { VendorPerformance } from "@/components/dashboard/vendor-performance"
import { ProcurementPieChart } from "@/components/dashboard/pie-chart"
import { BudgetVsActualChart } from "@/components/dashboard/budget-actual-chart"
import { BidsVsAwardsChart } from "@/components/charts/bids-vs-award-chart"
import { RedPlatinumChart } from "@/components/charts/red-platinum-chart"
import { DashboardProvider, useDashboard } from "@/hooks/use-dashboard-stats"

import {
  Award,
  MessageCircle,
  X,
  Send,
  User,
  Bot,
  FileText,
  DollarSign,
  Users,
  TrendingUp,
  Clock,
} from "lucide-react"

function DashboardContent() {
  const { selectedYear } = useDashboard()

  const currencyFormatter = new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
  });

  interface Message {
    role: "user" | "ai" | "system";
    text: string;
  }

  const [stats, setStats] = useState<any>(null)
  const [aiSummary, setAiSummary] = useState("")
  const [loadingAi, setLoadingAi] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isChatOpen, setIsChatOpen] = useState(false)

  const sendChatMessage = async (input) => {

    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

    const response = await fetch(`${apiUrl}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: input,
        year: selectedYear
      })
    })

    const data = await response.json()

    return data.answer
  }

  const sendMessage = async () => {

    if (!input.trim()) return

    const userMessage = input

    setMessages(prev => [
      ...prev,
      { role: "user", text: userMessage }
    ])

    setInput("")

    try {

      const answer = await sendChatMessage(userMessage)

      setMessages(prev => [
        ...prev,
        { role: "ai", text: answer }
      ])

    } catch (err) {

      console.error(err)

    }
  }

  useEffect(() => {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

    fetch(`${apiUrl}/dashboard?year=${selectedYear}`)
      .then((res) => res.json())
      .then((data) => {
        setStats(data)
      })
      .catch((err) => {
        console.error(err)
      })

    /* AI Summary Fetch
    setLoadingAi(true)

    fetch(`${apiUrl}/ai-summary?year=${selectedYear}`)
      .then((res) => res.json())
      .then((data) => {
        setAiSummary(data.ai_summary)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setLoadingAi(false)
      })*/

  }, [selectedYear])

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        {/* AI Summary 
        <div className="mb-8 rounded-xl border bg-card p-6 shadow-sm">
          <h2 className={`text-xl font-semibold ${loadingAi ? 'mb-3' : 'mb-0'}`}>AI Procurement Insights</h2>
          {loadingAi ? (
            <p className="text-muted-foreground">Generating AI insights...</p>
          ) : (
            <p className="text-sm leading-7 text-muted-foreground">{aiSummary}</p>
          )}
        </div>*/}
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <StatCard
            title="Bids Posted"
            value={currencyFormatter.format(stats?.bids?.bid_posted ?? 0)}
            change={10.2}
            changeLabel="vs last year"
            icon={<FileText className="h-4 w-4" />}
          />
          <StatCard
            title="Total ABC"
            value={currencyFormatter.format(stats?.bids?.total_abc ?? 0)}
            prefix="₱"
            change={14.5}
            changeLabel="vs last year"
            icon={<DollarSign className="h-4 w-4" />}
          />
          <StatCard
            title="Awards Posted"
            value={currencyFormatter.format(stats?.awards?.award_posted ?? 0)}
            change={10.2}
            changeLabel="vs last year"
            icon={<FileText className="h-4 w-4" />}
          />
          <StatCard
            title="Contract Amount"
            value={currencyFormatter.format(stats?.awards?.total_contract_amount ?? 0)}
            prefix="₱"
            change={14.5}
            changeLabel="vs last year"
            icon={<DollarSign className="h-4 w-4" />}
          />
          <StatCard
            title="Merchants Registration"
            value={currencyFormatter.format(stats?.merchant_stats?.total_registration ?? 0)}
            change={8.3}
            changeLabel="vs last year"
            icon={<Users className="h-4 w-4" />}
          />
          <StatCard
            title="Agency Registrations"
            value={currencyFormatter.format(stats?.agency_stats?.total_agencies ?? 0)}
            change={8.3}
            changeLabel="vs last year"
            icon={<Award className="h-4 w-4" />}
          />
        </div>

        {/* Floating Chat Box */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
          {/* Chat Window */}
          {isChatOpen && (
            <div className="mb-4 flex h-[500px] w-[380px] flex-col overflow-hidden rounded-2xl border bg-card shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-4 duration-300">
              {/* Header */}
              <div className="flex items-center justify-between bg-primary p-4 text-primary-foreground">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-foreground/20">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Procurement AI</h3>
                    <p className="text-[10px] opacity-80">Online | Ask me anything</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="rounded-full p-1 hover:bg-primary-foreground/10 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
                {messages.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground opacity-60">
                    <MessageCircle className="mb-2 h-10 w-10" />
                    <p className="text-sm italic">Hello! How can I help you with procurement data today?</p>
                  </div>
                ) : (
                  messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"
                        }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-none"
                          : "bg-muted text-foreground rounded-tl-none border"
                          }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1 opacity-70">
                          {msg.role === "user" ? (
                            <User className="h-3 w-3" />
                          ) : (
                            <Bot className="h-3 w-3" />
                          )}
                          <span className="text-[10px] font-medium uppercase tracking-wider">
                            {msg.role}
                          </span>
                        </div>
                        <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Input Area */}
              <div className="border-t p-4 bg-background">
                <div className="relative flex items-center">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type your message..."
                    className="w-full rounded-xl border bg-muted/50 px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim()}
                    className="absolute right-2 rounded-lg bg-primary p-2 text-primary-foreground transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Toggle Button */}
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 ${isChatOpen
              ? "bg-muted text-foreground"
              : "bg-primary text-primary-foreground"
              }`}
          >
            {isChatOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <MessageCircle className="h-6 w-6" />
            )}
          </button>
        </div>
        {/* Pie Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <RedPlatinumChart merchants={stats?.merchant_stats} />
          <div className="lg:col-span-2">
            <BidsVsAwardsChart bids_abc_per_month={stats?.bids_abc_per_month} awards_ca_per_month={stats?.awards_ca_per_month} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <ProcurementPieChart bids_abc_by_classification={stats?.bids_abc_by_classification} />
          <div className="lg:col-span-2">
            <BudgetVsActualChart bids_abc_per_month={stats?.bids_abc_per_month} awards_ca_per_month={stats?.awards_ca_per_month} />
          </div>
        </div>

        {/* Vendor Performance */}
        <div className="mt-6">
          <VendorPerformance top_10_merchants_by_ca={stats?.top_10_merchants_by_ca} />
        </div>

      </main>
    </div>
  )
}

export default function ProcurementDashboard() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  )
}
