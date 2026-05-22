import { ListFilters } from "@/lib/api/api-response"

export type DocumentStatus = "pending" | "approved" | "archived"

export interface DocumentItem {
  id: string
  companySlug: string
  name: string
  documentType: string
  status: DocumentStatus
  uploadedBy: string
  createdAt: string
  sizeLabel: string
  notes?: string
}

export interface DocumentFilters extends ListFilters {
  status: DocumentStatus | "all"
  sortBy: "createdAt" | "name" | "documentType" | "status"
}

export interface UploadDocumentInput {
  companySlug: string
  documentType: string
  file: File
  notes?: string
}
