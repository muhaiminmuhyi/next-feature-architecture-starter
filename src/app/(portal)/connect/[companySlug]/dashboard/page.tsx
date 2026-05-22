import { DashboardOverview } from "@/features/dashboard/components/dashboard-overview"

interface DashboardPageProps {
  params: Promise<{
    companySlug: string
  }>
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { companySlug } = await params

  return <DashboardOverview companySlug={companySlug} />
}
