import { ApiResponse } from "@/lib/api/api-response"
import { DashboardSummary } from "@/features/dashboard/types/dashboard.type"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const mockedSummaries: Record<string, DashboardSummary> = {
  "client-a": {
    totalDocuments: 24,
    pendingDocuments: 4,
    recentUploads: 3,
  },
  "client-b": {
    totalDocuments: 18,
    pendingDocuments: 2,
    recentUploads: 1,
  },
}

export async function getDashboardSummary(
  companySlug: string
): Promise<ApiResponse<DashboardSummary>> {
  await delay(450)

  return {
    data: mockedSummaries[companySlug] ?? {
      totalDocuments: 0,
      pendingDocuments: 0,
      recentUploads: 0,
    },
  }
}
