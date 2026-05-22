"use client"

import { Clock3, FileCheck2, Files } from "lucide-react"

import { ErrorState } from "@/components/shared/error-state"
import { LoadingState } from "@/components/shared/loading-state"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useDashboardSummary } from "@/features/dashboard/hooks/use-dashboard-summary"
import { SummaryCard } from "@/features/dashboard/components/summary-card"

interface DashboardOverviewProps {
  companySlug: string
}

export function DashboardOverview({ companySlug }: DashboardOverviewProps) {
  const summaryQuery = useDashboardSummary(companySlug)

  if (summaryQuery.isLoading) {
    return <LoadingState />
  }

  if (summaryQuery.isError || !summaryQuery.data) {
    return (
      <ErrorState description="The mocked dashboard summary could not be loaded." />
    )
  }

  const summary = summaryQuery.data

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="A minimal summary page that demonstrates route structure and feature-based data hooks."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <SummaryCard
          title="Total documents"
          value={summary.totalDocuments}
          description="Count returned from the mocked dashboard API."
          icon={Files}
        />
        <SummaryCard
          title="Pending review"
          value={summary.pendingDocuments}
          description="Representative server-driven status summary."
          icon={FileCheck2}
        />
        <SummaryCard
          title="Recent uploads"
          value={summary.recentUploads}
          description="Lightweight starter metric for future expansion."
          icon={Clock3}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Starter template note</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            This page stays intentionally small. Its job is to show how a portal
            route consumes a feature hook and renders stable layout structure.
          </p>
          <p>
            Future product work can extend this area without changing the
            routing, query, or shell foundations.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
