"use client"

import { useQuery } from "@tanstack/react-query"

import { getDashboardSummary } from "@/features/dashboard/api/dashboard.api"

export function useDashboardSummary(companySlug: string) {
  return useQuery({
    queryKey: ["dashboard-summary", companySlug],
    queryFn: async () => (await getDashboardSummary(companySlug)).data,
  })
}
