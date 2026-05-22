import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { DocumentStatus } from "@/features/document/types/document.type"

interface DocumentStatusBadgeProps {
  status: DocumentStatus
}

const statusStyles: Record<DocumentStatus, string> = {
  approved: "border-emerald-200 bg-emerald-50 text-emerald-700",
  pending: "border-amber-200 bg-amber-50 text-amber-700",
  archived: "border-zinc-200 bg-zinc-100 text-zinc-700",
}

export function DocumentStatusBadge({ status }: DocumentStatusBadgeProps) {
  return (
    <Badge variant="outline" className={cn("capitalize", statusStyles[status])}>
      {status}
    </Badge>
  )
}
