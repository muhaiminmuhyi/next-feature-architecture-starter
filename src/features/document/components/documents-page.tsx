"use client"

import { startTransition, useDeferredValue, useState } from "react"

import { ErrorState } from "@/components/shared/error-state"
import { LoadingState } from "@/components/shared/loading-state"
import { PageHeader } from "@/components/shared/page-header"
import { DocumentFilter } from "@/features/document/components/document-filter"
import { DocumentTable } from "@/features/document/components/document-table"
import { UploadDocumentDialog } from "@/features/document/components/upload-document-dialog"
import {
  defaultDocumentFilters,
  useDocuments,
} from "@/features/document/hooks/use-documents"
import { DocumentFilters } from "@/features/document/types/document.type"

interface DocumentsPageProps {
  companySlug: string
}

export function DocumentsPage({ companySlug }: DocumentsPageProps) {
  const [filters, setFilters] = useState<DocumentFilters>(defaultDocumentFilters)
  const deferredSearch = useDeferredValue(filters.search)
  const queryFilters = {
    ...filters,
    search: deferredSearch,
  }
  const documentsQuery = useDocuments(companySlug, queryFilters)

  function updateFilters(nextFilters: Partial<DocumentFilters>) {
    startTransition(() => {
      setFilters((current) => {
        const resetsPage =
          "search" in nextFilters ||
          "status" in nextFilters ||
          "sortBy" in nextFilters ||
          "sortOrder" in nextFilters ||
          "limit" in nextFilters

        return {
          ...current,
          ...nextFilters,
          page: resetsPage ? 1 : nextFilters.page ?? current.page,
        }
      })
    })
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Documents"
        description="Representative list feature with server-style filters, pagination, upload mutation, and query invalidation."
        action={<UploadDocumentDialog companySlug={companySlug} />}
      />

      <DocumentFilter filters={filters} onChange={updateFilters} />

      {documentsQuery.isLoading ? (
        <LoadingState />
      ) : documentsQuery.isError || !documentsQuery.data ? (
        <ErrorState description="The mocked documents API could not be loaded." />
      ) : (
        <>
          {documentsQuery.isFetching ? (
            <p className="text-sm text-muted-foreground">Refreshing list...</p>
          ) : null}
          <DocumentTable
            documents={documentsQuery.data.data}
            meta={documentsQuery.data.meta}
            onPageChange={(page) => updateFilters({ page })}
            onLimitChange={(limit) => updateFilters({ limit })}
          />
        </>
      )}
    </div>
  )
}
