"use client"

import { CompanyCard } from "@/features/company/components/company-card"
import { useUserCompanies } from "@/features/company/hooks/use-user-companies"
import { ErrorState } from "@/components/shared/error-state"
import { LoadingState } from "@/components/shared/loading-state"
import { PageHeader } from "@/components/shared/page-header"

export default function ConnectPage() {
  const companiesQuery = useUserCompanies()

  if (companiesQuery.isLoading) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6">
        <PageHeader
          title="Your Connections"
          description="Choose a client workspace to open the starter portal."
        />
        <LoadingState />
      </main>
    )
  }

  if (companiesQuery.isError || !companiesQuery.data) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6">
        <PageHeader title="Your Connections" />
        <ErrorState description="The mocked company list could not be loaded." />
      </main>
    )
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6">
      <PageHeader
        title="Your Connections"
        description="Choose a client workspace to open the starter portal."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {companiesQuery.data.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </main>
  )
}
