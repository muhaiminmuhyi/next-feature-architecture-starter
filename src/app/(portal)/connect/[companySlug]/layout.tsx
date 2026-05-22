import { ReactNode } from "react"
import { notFound } from "next/navigation"

import { PortalShell } from "@/components/layout/portal-shell"
import { isSupportedCompanySlug } from "@/features/company/api/company.api"

interface CompanyPortalLayoutProps {
  children: ReactNode
  params: Promise<{
    companySlug: string
  }>
}

export default async function CompanyPortalLayout({
  children,
  params,
}: CompanyPortalLayoutProps) {
  const { companySlug } = await params

  if (!isSupportedCompanySlug(companySlug)) {
    notFound()
  }

  return <PortalShell companySlug={companySlug}>{children}</PortalShell>
}
