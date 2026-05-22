import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Company } from "@/features/company/types/company.type"

interface CompanyCardProps {
  company: Company
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{company.name}</CardTitle>
        <CardDescription>{company.description}</CardDescription>
        <CardAction>
          <Badge variant="secondary">{company.status}</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Button asChild>
          <Link href={`/connect/${company.slug}/dashboard`}>
            Open portal
            <ArrowRight />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
