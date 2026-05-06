"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Download, FileText, Calendar, RefreshCw } from "lucide-react"

const reports = [
  {
    id: "RPT-001",
    name: "Monthly Procurement Summary",
    type: "Summary",
    frequency: "Monthly",
    lastGenerated: "2025-01-31",
    format: "PDF",
    status: "ready",
  },
  {
    id: "RPT-002",
    name: "Vendor Performance Report",
    type: "Analytics",
    frequency: "Quarterly",
    lastGenerated: "2025-01-15",
    format: "Excel",
    status: "ready",
  },
  {
    id: "RPT-003",
    name: "Spending Analysis by Category",
    type: "Analytics",
    frequency: "Monthly",
    lastGenerated: "2025-01-31",
    format: "PDF",
    status: "ready",
  },
  {
    id: "RPT-004",
    name: "Contract Expiration Report",
    type: "Compliance",
    frequency: "Weekly",
    lastGenerated: "2025-02-03",
    format: "PDF",
    status: "ready",
  },
  {
    id: "RPT-005",
    name: "Year-over-Year Comparison",
    type: "Analytics",
    frequency: "Annual",
    lastGenerated: "2025-01-01",
    format: "Excel",
    status: "ready",
  },
  {
    id: "RPT-006",
    name: "Compliance Audit Report",
    type: "Compliance",
    frequency: "Quarterly",
    lastGenerated: "2025-01-15",
    format: "PDF",
    status: "generating",
  },
]

const typeColors: Record<string, string> = {
  Summary: "bg-primary/20 text-primary border-primary/30",
  Analytics: "bg-accent/20 text-accent border-accent/30",
  Compliance: "bg-chart-3/20 text-chart-3 border-chart-3/30",
}

export function ReportsList() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-medium text-foreground">Available Reports</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Download or regenerate procurement reports</p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <FileText className="h-4 w-4 mr-2" />
            Create Custom Report
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Report Name</TableHead>
                <TableHead className="text-muted-foreground">Type</TableHead>
                <TableHead className="text-muted-foreground">Frequency</TableHead>
                <TableHead className="text-muted-foreground">Last Generated</TableHead>
                <TableHead className="text-muted-foreground">Format</TableHead>
                <TableHead className="text-muted-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id} className="border-border hover:bg-secondary/50">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">{report.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={typeColors[report.type]}>
                      {report.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{report.frequency}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{report.lastGenerated}</TableCell>
                  <TableCell>
                    <span className="text-sm font-mono text-muted-foreground">{report.format}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border bg-secondary h-8"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                        <span className="sr-only">Regenerate</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border bg-secondary h-8"
                        disabled={report.status === "generating"}
                      >
                        <Download className="h-3.5 w-3.5 mr-1.5" />
                        {report.status === "generating" ? "Generating..." : "Download"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
