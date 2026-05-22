"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUserCompanies } from "@/features/company/hooks/use-user-companies"

interface CompanySwitcherProps {
  currentCompanySlug: string
}

export function CompanySwitcher({ currentCompanySlug }: CompanySwitcherProps) {
  const router = useRouter()
  const companiesQuery = useUserCompanies()
  const companies = companiesQuery.data ?? []
  const currentCompany = companies.find(
    (company) => company.slug === currentCompanySlug
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="min-w-40 justify-between">
          <span className="truncate">
            {currentCompany?.name ?? "Select company"}
          </span>
          <ChevronsUpDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Connections</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {companies.map((company) => (
          <DropdownMenuItem
            key={company.id}
            onSelect={() => router.push(`/connect/${company.slug}/dashboard`)}
          >
            <span className="flex-1">{company.name}</span>
            {company.slug === currentCompanySlug ? <Check /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
