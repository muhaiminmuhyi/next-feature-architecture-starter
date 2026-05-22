"use client"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DocumentFilters } from "@/features/document/types/document.type"

interface DocumentFilterProps {
  filters: DocumentFilters
  onChange: (nextFilters: Partial<DocumentFilters>) => void
}

export function DocumentFilter({ filters, onChange }: DocumentFilterProps) {
  return (
    <div className="grid gap-3 rounded-lg border bg-card p-4 md:grid-cols-[minmax(0,1.4fr)_180px_180px_140px]">
      <Input
        value={filters.search}
        onChange={(event) => onChange({ search: event.target.value })}
        placeholder="Search documents"
      />

      <Select
        value={filters.status}
        onValueChange={(value) =>
          onChange({ status: value as DocumentFilters["status"] })
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="approved">Approved</SelectItem>
          <SelectItem value="archived">Archived</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.sortBy}
        onValueChange={(value) =>
          onChange({ sortBy: value as DocumentFilters["sortBy"] })
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="createdAt">Created date</SelectItem>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="documentType">Document type</SelectItem>
          <SelectItem value="status">Status</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.sortOrder}
        onValueChange={(value) =>
          onChange({ sortOrder: value as DocumentFilters["sortOrder"] })
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Order" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="desc">Newest first</SelectItem>
          <SelectItem value="asc">Oldest first</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
