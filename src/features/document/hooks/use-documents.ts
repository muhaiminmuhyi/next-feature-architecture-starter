"use client"

import { useQuery } from "@tanstack/react-query"

import { getDocuments } from "@/features/document/api/document.api"
import { DocumentFilters } from "@/features/document/types/document.type"

export const defaultDocumentFilters: DocumentFilters = {
  page: 1,
  limit: 10,
  search: "",
  status: "all",
  sortBy: "createdAt",
  sortOrder: "desc",
}

export function useDocuments(companySlug: string, filters: DocumentFilters) {
  return useQuery({
    queryKey: ["documents", companySlug, filters],
    queryFn: () => getDocuments(companySlug, filters),
  })
}
