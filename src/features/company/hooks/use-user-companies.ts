"use client"

import { useQuery } from "@tanstack/react-query"

import { getUserCompanies } from "@/features/company/api/company.api"

export function useUserCompanies() {
  return useQuery({
    queryKey: ["user-companies"],
    queryFn: async () => (await getUserCompanies()).data,
  })
}
