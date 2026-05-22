import { FileText } from "lucide-react"

import { DataTablePagination } from "@/components/shared/data-table-pagination"
import { EmptyState } from "@/components/shared/empty-state"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DocumentStatusBadge } from "@/features/document/components/document-status-badge"
import { DocumentItem } from "@/features/document/types/document.type"
import { PaginationMeta } from "@/lib/api/api-response"

interface DocumentTableProps {
  documents: DocumentItem[]
  meta: PaginationMeta
  onPageChange: (page: number) => void
  onLimitChange: (limit: number) => void
}

export function DocumentTable({
  documents,
  meta,
  onPageChange,
  onLimitChange,
}: DocumentTableProps) {
  if (documents.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="No documents found"
        description="Try adjusting the current filters or upload a representative file."
      />
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documents</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-4">Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Uploaded by</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Size</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((document) => (
              <TableRow key={document.id}>
                <TableCell className="px-4 font-medium">{document.name}</TableCell>
                <TableCell>{document.documentType}</TableCell>
                <TableCell>
                  <DocumentStatusBadge status={document.status} />
                </TableCell>
                <TableCell>{document.uploadedBy}</TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "medium",
                  }).format(new Date(document.createdAt))}
                </TableCell>
                <TableCell>{document.sizeLabel}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <DataTablePagination
          page={meta.page}
          limit={meta.limit}
          total={meta.total}
          totalPages={meta.totalPages}
          onPageChange={onPageChange}
          onLimitChange={onLimitChange}
        />
      </CardContent>
    </Card>
  )
}
