import { ApiResponse } from "@/lib/api/api-response"
import { Company } from "@/features/company/types/company.type"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const mockedCompanies: Company[] = [
  {
    id: "company_1",
    name: "Client A",
    slug: "client-a",
    description: "Primary client workspace for starter navigation.",
    status: "active",
  },
  {
    id: "company_2",
    name: "Client B",
    slug: "client-b",
    description: "Second mocked connection for multi-tenant routing.",
    status: "active",
  },
]

export async function getUserCompanies(): Promise<ApiResponse<Company[]>> {
  await delay(500)

  return {
    data: mockedCompanies,
  }
}

export async function getCompanyBySlug(
  companySlug: string
): Promise<ApiResponse<Company | undefined>> {
  await delay(300)

  return {
    data: mockedCompanies.find((company) => company.slug === companySlug),
  }
}

export function isSupportedCompanySlug(companySlug: string) {
  return mockedCompanies.some((company) => company.slug === companySlug)
}
